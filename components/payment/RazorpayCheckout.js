"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../app/context/AppContext";
import { io } from "socket.io-client";

export default function RazorpayCheckout({ cartTotal, autoPay }) {
  const router = useRouter();
  const { settings, cart } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Load Razorpay script dynamically
    const loadScript = () => {
      // Prevent multiple script tags
      if (document.getElementById('razorpay-sdk')) {
        setScriptLoaded(true);
        return;
      }
      
      const script = document.createElement("script");
      script.id = 'razorpay-sdk';
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);
    };
    loadScript();

    // Setup Socket.io
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const serverUrl = apiUrl.replace('/api', '');
    socketRef.current = io(serverUrl);

    socketRef.current.on("payment_success", (data) => {
      console.log("Payment success received via socket", data);
      router.push(`/thank-you?order_id=${data.orderId}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (autoPay && scriptLoaded) {
      handlePayment();
    }
  }, [autoPay, scriptLoaded]);

  const handlePayment = async () => {
    // Safety check with a small delay for auto-trigger
    if (typeof window === "undefined" || !window.Razorpay) {
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Please refresh the page or check your connection.");
      } else {
        // Sometimes script.onload fires slightly before window.Razorpay is available
        setTimeout(handlePayment, 500); 
      }
      return;
    }

    if (!settings?.razorpayKeyId) {
      alert("Razorpay Key ID is missing in Admin settings.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order in MongoDB first
      const savedAddress = localStorage.getItem("address");
      const addressData = savedAddress ? JSON.parse(savedAddress) : null;
      
      if (!addressData) {
        alert("Please provide a delivery address.");
        setIsProcessing(false);
        return router.push('/address');
      }

      const orderPayload = {
        name: addressData.name,
        phone: addressData.phone,
        streetAddress: `${addressData.house}, ${addressData.area}`,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        amount: cartTotal,
        items: cart.map(item => ({
          productName: item.title,
          quantity: item.quantity || 1,
          price: item.price,
          image: item.images?.[0] || ""
        }))
      };

      const dbOrderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });
      const dbOrderData = await dbOrderRes.json();
      
      if (!dbOrderData.success) {
        throw new Error(dbOrderData.message || "Failed to save order details");
      }
      
      const mongoOrderId = dbOrderData.data._id;

      // 2. Generate Razorpay Payment Link
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/generate-payment-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          orderId: mongoOrderId,
          customerDetails: {
            name: addressData.name,
            phone: addressData.phone,
            email: "customer@example.com"
          },
          callback_url: `${window.location.origin}/thank-you?order_id=${mongoOrderId}`
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Server error: " + data.message);
        setIsProcessing(false);
        return;
      }

      // 3. Redirect to the Payment Link hosted by Razorpay
      window.location.href = data.payment_link_url;

    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Something went wrong with the payment.");
      setIsProcessing(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={isProcessing}
      className={`w-full bg-[#ffc200] text-[#212121] px-4 py-3.5 whitespace-nowrap rounded-[2px] font-bold text-[15px] ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? "PROCESSING..." : "PROCEED TO PAY"}
    </button>
  );
}

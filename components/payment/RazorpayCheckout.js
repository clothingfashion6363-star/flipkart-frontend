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

      // 2. Create order on backend (Razorpay gateway)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          currency: "INR",
          orderId: mongoOrderId
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Server error: " + data.message);
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: settings.razorpayKeyId,
        amount: data.order.amount,
        currency: data.order.currency,
        name: settings.logoName || "Store",
        description: "Payment for Order",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment Signature
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Redirect to thank you page on success
              router.push(`/thank-you?order_id=${data.order.id}`);
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Verification error.");
          }
        },
        prefill: {
          name: addressData.name || "Customer",
          email: "customer@example.com",
          contact: addressData.phone || "9999999999",
        },
        theme: {
          color: settings.primaryColor || "#2874f0",
        },
        modal: {
          ondismiss: function() {
            // If user closes popup, go back
            router.back();
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Something went wrong with the payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={isProcessing || !scriptLoaded}
      className={`w-full bg-[#ffc200] text-[#212121] px-4 py-3.5 whitespace-nowrap rounded-[2px] font-bold text-[15px] ${isProcessing || !scriptLoaded ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? "PROCESSING..." : "PROCEED TO PAY"}
    </button>
  );
}

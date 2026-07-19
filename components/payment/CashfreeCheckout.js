"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../app/context/AppContext";
import { io } from "socket.io-client";

export default function CashfreeCheckout({ cartTotal, buttonText, customClass, autoPay }) {
  const router = useRouter();
  const { settings, cart } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Setup Socket.io
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const serverUrl = apiUrl.replace('/api', '');
    socketRef.current = io(serverUrl);

    socketRef.current.on("payment_success", (data) => {
      console.log("Cashfree payment success received via socket", data);
      router.push(`/thank-you?order_id=${data.orderId}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handlePay = async () => {
    try {
      setIsProcessing(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
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

      const dbOrderRes = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });
      const dbOrderData = await dbOrderRes.json();
      
      if (!dbOrderData.success) {
        throw new Error(dbOrderData.message || "Failed to save order details");
      }
      
      const mongoOrderId = dbOrderData.data._id;

      // 2. Create order on Cashfree gateway
      const res = await fetch(`${apiUrl}/payment/create-cashfree-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: cartTotal, 
          currency: "INR",
          orderId: mongoOrderId,
          customerDetails: {
            name: addressData.name,
            phone: addressData.phone,
            email: "customer@example.com"
          }
        }),
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to create Cashfree order");
      
      // 3. Initialize Cashfree SDK
      // Using dynamic mode based on backend response
      const cashfreeMode = data.environment || "sandbox";
      const cashfree = window.Cashfree({
        mode: cashfreeMode
      });
      
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal"
      };

      // 4. Handle checkout completion
      cashfree.checkout(checkoutOptions).then(async (result) => {
        if (result.error) {
          console.error("Cashfree Error:", result.error);
          alert(result.error.message || "Payment Failed");
          setIsProcessing(false);
          return;
        }

        if (result.redirect) {
          // If Cashfree handles redirection
          return;
        }

        if (result.paymentDetails) {
          try {
            // Verify payment on backend
            const verifyRes = await fetch(`${apiUrl}/payment/verify-cashfree-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ order_id: data.order_id }),
            });
            
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              router.push(`/thank-you?order_id=${data.order_id}`);
            } else {
              alert("Payment verification failed");
              setIsProcessing(false);
            }
          } catch (err) {
            console.error(err);
            alert("Error verifying Cashfree payment");
            setIsProcessing(false);
          }
        }
      });

    } catch (error) {
      console.error(error);
      alert(error.message || "Error initiating Cashfree payment");
      setIsProcessing(false);
    }
  };

  const defaultClass = `w-full bg-[#ffc200] text-[#212121] px-4 py-3.5 whitespace-nowrap rounded-[2px] font-bold text-[15px] ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`;

  return (
    <>
      <Script 
        src="https://sdk.cashfree.com/js/v3/cashfree.js" 
        strategy="afterInteractive"
        onLoad={() => {
          if (autoPay) handlePay();
        }}
      />
      <button 
        onClick={handlePay}
        disabled={isProcessing}
        className={customClass ? `${customClass} ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}` : defaultClass}
      >
        {isProcessing ? "PROCESSING..." : (buttonText || "PROCEED TO PAY")}
      </button>
    </>
  );
}

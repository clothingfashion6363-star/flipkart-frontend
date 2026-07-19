"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export default function DirectUpiCheckout({ cartTotal, orderId, autoPay }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiUrl, setUpiUrl] = useState("");
  const [isMobile, setIsMobile] = useState(true);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Basic mobile detection
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setIsMobile(mobile);
    if (autoPay) {
      handlePay();
    }
  }, [autoPay]);

  const handlePay = async () => {
    try {
      setIsProcessing(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
      const res = await fetch(`${apiUrl}/payment/generate-upi-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal, orderId: orderId }),
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to generate UPI link");
      
      setUpiUrl(data.upi_url);

      if (isMobile) {
        // Automatically open UPI intent on mobile
        window.location.href = data.upi_url;
        setShowQR(true); // Fallback UI
      } else {
        // Show QR Code on desktop
        setShowQR(true);
      }

    } catch (error) {
      console.error(error);
      alert("Error initiating Direct UPI payment");
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = () => {
    // Assuming payment is done, redirect to thank you page
    if (orderId) {
      router.push(`/thank-you?order_id=${orderId}`);
    } else {
      router.push(`/thank-you`);
    }
  };

  if (showQR && upiUrl) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg">
        <h3 className="font-bold text-lg mb-2 text-center text-[#212121]">Pay via UPI</h3>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {isMobile ? "If the app didn't open automatically, scan this QR code" : "Scan this QR code with any UPI app"}
        </p>
        <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-lg mb-4">
          <QRCodeSVG value={upiUrl} size={200} />
        </div>
        <p className="font-bold text-[22px] mb-4 text-[#212121]">₹{cartTotal}</p>
        <button 
          onClick={handleConfirmPayment}
          className="w-full bg-[#2874f0] text-white px-6 py-3 rounded-[2px] font-bold text-[15px] hover:bg-[#2874f0]/90 transition-colors"
        >
          I HAVE PAID
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handlePay}
      disabled={isProcessing}
      className={`w-full bg-[#ffc200] text-[#212121] px-4 py-3.5 whitespace-nowrap rounded-[2px] font-bold text-[15px] ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? "PROCESSING..." : "PROCEED TO PAY"}
    </button>
  );
}

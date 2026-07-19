"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../app/context/AppContext";
import { QRCodeSVG } from "qrcode.react";

export default function PaytmCheckout({ cartTotal, selectedUpi, autoPay }) {
  const router = useRouter();
  const { settings } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [upiUrl, setUpiUrl] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setIsMobile(mobile);
    if (autoPay) {
      handlePay();
    }
  }, [autoPay]);

  const handlePay = () => {
    setIsProcessing(true);
    
    if (isMobile) {
      router.push(`/processing?upi=${selectedUpi}`);
    } else {
      const upiId = settings?.upiId || "merchant@upi";
      const name = settings?.logoName || "Store";
      const formattedAmount = Number(cartTotal).toFixed(2);
      const dynamicOrderId = `ORD${Date.now()}`;
      
      const safePa = encodeURIComponent(upiId);
      const safePn = encodeURIComponent(name);
      const safeTn = encodeURIComponent(dynamicOrderId);
      
      let intentUrl = "";
      if (selectedUpi === 'paytm') {
        intentUrl = `paytmmp://pay?pa=${safePa}&pn=${safePn}&am=${formattedAmount}&cu=INR&tn=${safeTn}`;
      } else {
        intentUrl = `upi://pay?pa=${safePa}&pn=${safePn}&am=${formattedAmount}&cu=INR&tn=${safeTn}`;
      }
      
      setUpiUrl(intentUrl);
      setShowQR(true);
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = () => {
    router.push(`/thank-you?order_id=MANUAL_${Date.now()}`);
  };

  if (showQR && upiUrl) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-2 text-center text-[#212121]">Complete Your Payment</h3>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {isMobile ? "If the app didn't open automatically, scan this QR code" : "Scan this QR code with any UPI app"}
        </p>
        <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-lg mb-4">
          <QRCodeSVG value={upiUrl} size={200} />
        </div>
        <p className="font-bold text-[22px] mb-4 text-[#212121]">₹{cartTotal}</p>
        <button 
          onClick={handleConfirmPayment}
          className="w-full bg-[#00baf2] text-white px-6 py-3 rounded-[2px] font-bold text-[15px] hover:bg-[#00baf2]/90 transition-colors"
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

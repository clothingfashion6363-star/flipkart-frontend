"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

import RazorpayCheckout from "../../components/payment/RazorpayCheckout";
import PaytmCheckout from "../../components/payment/PaytmCheckout";
import CashfreeCheckout from "../../components/payment/CashfreeCheckout";
import DirectUpiCheckout from "../../components/payment/DirectUpiCheckout";

export default function PaymentPage() {
  const router = useRouter();
  const { cartTotal, cartOriginalTotal, cart, isLoaded, settings } = useAppContext();
  const [selectedGateway, setSelectedGateway] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.push("/");
    }
  }, [cart.length, isLoaded, router]);

  if (!mounted || !isLoaded || cart.length === 0) return null;

  const RadioButton = ({ selected }) => (
    <div className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center shrink-0 ${selected ? 'border-[#2874f0]' : 'border-gray-400'}`}>
      {selected && <div className="w-[10px] h-[10px] rounded-full bg-[#2874f0]"></div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#EAEAF2] flex justify-center items-center font-sans">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-[16px] font-medium text-[#212121]">Initializing Secure Payment...</h2>
        <p className="text-[13px] text-gray-500 mt-2">Please do not refresh the page.</p>
        
        {/* Hidden Razorpay Checkout Component that auto-triggers */}
        <div className="hidden">
          <RazorpayCheckout cartTotal={cartTotal} autoPay={true} />
        </div>
      </div>
    </div>
  );
}

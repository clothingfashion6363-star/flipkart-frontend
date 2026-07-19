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
    <div className="min-h-screen bg-[#EAEAF2] flex justify-center font-sans pb-[80px]">
      <div className="w-full max-w-[600px] bg-white flex flex-col min-h-screen shadow-lg">
        
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="text-[16px] font-medium text-[#212121]">Payment Options</h1>
        </div>

        {/* Options */}
        <div className="p-4 flex-1">
          <h2 className="text-[15px] font-bold text-[#212121] mb-4">Select Payment Gateway</h2>
          
          <div 
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-[4px] mb-3 cursor-pointer"
            onClick={() => setSelectedGateway("razorpay")}
          >
            <RadioButton selected={selectedGateway === "razorpay"} />
            <div>
              <div className="text-[15px] font-medium text-[#212121]">Razorpay</div>
              <div className="text-[12px] text-gray-500">Pay via UPI, Cards, Wallets, NetBanking</div>
            </div>
          </div>

          {/* <div 
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-[4px] mb-3 cursor-pointer"
            onClick={() => setSelectedGateway("cashfree")}
          >
            <RadioButton selected={selectedGateway === "cashfree"} />
            <div>
              <div className="text-[15px] font-medium text-[#212121]">Cashfree Payments</div>
              <div className="text-[12px] text-gray-500">Fast & Secure Payments</div>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 max-w-[600px] mx-auto z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          {selectedGateway === "razorpay" ? (
            <RazorpayCheckout cartTotal={cartTotal} autoPay={false} />
          ) : (
            <CashfreeCheckout cartTotal={cartTotal} autoPay={false} />
          )}
        </div>

      </div>
    </div>
  );
}

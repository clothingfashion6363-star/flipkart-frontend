"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || `OD${Math.floor(Math.random() * 10000000000)}`;
  
  const [status, setStatus] = useState("processing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing time
    const duration = 4000; // 4 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setStatus("success");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-[#EAEAF2] flex flex-col overflow-hidden">
      <div className="bg-white shrink-0">
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <h1 className="text-[15px] font-bold text-gray-800 tracking-wide uppercase mx-auto">Order Status</h1>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center relative overflow-hidden">
          {status === "processing" ? (
            <div className="flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
              <svg className="w-16 h-16 text-meesho-purple animate-spin mb-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" className="opacity-75"></path>
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Processing Your Order</h2>
              <p className="text-gray-500 text-sm mb-6">Please do not refresh this page or press back button.</p>
              
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                <div 
                  className="bg-meesho-purple h-2 rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Verifying details...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-[scaleIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 text-sm mb-6">Your order has been placed successfully.</p>
              <p className="text-xs text-gray-400">Redirecting to homepage...</p>
            </div>
          )}
          
          <div className="mt-8 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Order ID: <span className="text-gray-800 font-bold">{orderId}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-[#EAEAF2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-meesho-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

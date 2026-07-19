"use client";
import React from 'react';

export default function CheckoutStepper({ currentStep }) {
  const steps = [
    { id: 1, label: "Cart" },
    { id: 2, label: "Address" },
    { id: 3, label: "Payment" },
    { id: 4, label: "Summary" }
  ];

  return (
    <div className="bg-white py-2 px-4 w-full max-w-[800px] mx-auto border-b border-gray-100">
      <div className="flex justify-between items-start relative max-w-[400px] mx-auto">
        {/* Connecting line */}
        <div className="absolute top-[12px] left-[15%] right-[15%] h-[2px] bg-[#e0e0e0] z-0"></div>
        
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPassed = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-1 z-10 w-1/4">
              <div className="bg-white px-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold border-2 
                  ${isActive ? 'border-meesho-purple text-meesho-purple bg-white' : 
                    isPassed ? 'border-meesho-purple bg-meesho-purple text-white' : 'border-[#d4d4d4] text-[#d4d4d4] bg-white'}`}>
                  {isPassed ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : step.id}
                </div>
              </div>
              <span className={`text-[11px] font-bold ${isActive || isPassed ? 'text-gray-800' : 'text-[#c0c0c0]'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

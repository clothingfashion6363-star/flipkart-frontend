"use client";
import React from 'react';

export default function TrustBanner() {
  return (
    <div className="bg-[#FFF6E5] py-2.5 my-2 flex items-center justify-around w-full shadow-sm max-w-[600px] mx-auto md:max-w-full">
      {/* Easy Returns */}
      <div className="flex items-center gap-2 flex-1 justify-center px-1">
        <div className="bg-meesho-purple rounded-full p-1 flex-shrink-0 flex items-center justify-center relative w-[32px] h-[32px]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </div>
        <div className="flex flex-col text-meesho-purple font-extrabold text-[11px] sm:text-[13px] leading-[1.1] text-left">
          <span>Easy returns</span>
          <span>& refunds</span>
        </div>
      </div>
      
      {/* Cash on delivery */}
      <div className="flex items-center gap-2 flex-1 justify-center px-1">
        <div className="bg-[#F48915] rounded-full p-1 flex-shrink-0 flex items-center justify-center w-[32px] h-[32px] relative">
           <svg viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        </div>
        <div className="flex flex-col text-meesho-purple font-extrabold text-[11px] sm:text-[13px] leading-[1.1] text-left">
          <span>Cash on</span>
          <span>delivery</span>
        </div>
      </div>

      {/* Lowest Price */}
      <div className="flex items-center gap-2 flex-1 justify-center px-1">
        <div className="bg-meesho-purple rounded-full p-1 flex-shrink-0 flex items-center justify-center relative w-[32px] h-[32px]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M6 4H10.5M10.5 4C12.9853 4 15 6.01472 15 8.5C15 10.9853 12.9853 13 10.5 13H6L13 20M10.5 4H18M6 8.5H18" />
          </svg>
        </div>
        <div className="flex flex-col text-meesho-purple font-extrabold text-[11px] sm:text-[13px] leading-[1.1] text-left">
          <span>Lowest</span>
          <span>price</span>
        </div>
      </div>
    </div>
  );
}

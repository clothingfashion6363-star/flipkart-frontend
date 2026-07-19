"use client";

import React, { useState, useEffect } from "react";

export default function CustomPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 1 second initially
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(initialTimer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Reappear after 5 seconds as per target site logic
    setTimeout(() => {
      setIsVisible(true);
    }, 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-[#333] text-white p-5 rounded-xl z-[9999] max-w-[300px] shadow-2xl border border-gray-600 animate-[slideUp_0.3s_ease-out]">
      <span 
        onClick={closePopup}
        className="absolute top-1 right-2.5 cursor-pointer text-gray-400 hover:text-white font-bold text-lg"
      >
        &#10006;
      </span>
      <h3 className="m-0 text-[#e91e63] font-bold text-sm leading-tight uppercase">
        30% CASH BACK ON ORDER OFF 298
      </h3>
      <p className="m-0 mt-1 font-bold text-xs">
        OFFER VALID ONLY TODAY
      </p>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  // Get the main image
  const mainImage = product.image || (product.images && product.images[0]) || product.img1 || "";

  const originalPrice = product.originalPrice || product.price + 100;
  const discount = product.discount || (originalPrice > product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 20);

  return (
    <div 
      className="relative flex flex-col bg-white overflow-hidden cursor-pointer"
      onClick={() => router.push(`/product/${product.id || product._id}`)}
    >
      <div className="relative w-full pt-[110%] bg-white overflow-hidden p-2">
        <img 
          src={mainImage} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-contain object-center p-3"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-2 gap-1 bg-white">
        <h3 className="text-[13px] font-semibold text-black truncate overflow-hidden whitespace-nowrap">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[13px] font-bold text-[#388e3c]">{discount}% Off</span>
          <span className="text-[13px] text-gray-500 line-through font-medium">₹{originalPrice}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[16px] font-extrabold text-black">₹{product.price}</span>
          {/* Mock Assured Badge */}
          <div className="flex items-center">
            <div className="bg-[#2874f0] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm italic flex items-center gap-0.5">
              <span className="w-3 h-3 bg-yellow-400 text-blue-600 rounded-full flex items-center justify-center not-italic text-[8px]">f</span>
              Assured
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <span className="flex items-center justify-center gap-0.5 bg-[#388e3c] text-white px-1.5 py-0.5 rounded-sm text-[10px] font-bold">
            {product.rating || "4.1"}
            <svg width="8" height="8" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z" fill="#ffffff"></path>
            </svg>
          </span>
          <span className="text-[11px] text-gray-500 font-bold ml-1">{(product.reviews && String(product.reviews).length > 0) ? product.reviews : "9358"} Ratings</span>
        </div>
        <div className="mt-auto pt-1">
          <p className="text-[11px] font-bold text-[#388e3c] mt-1 mb-1">Free delivery in Two Days</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { mallBrands } from "../data/banners";

export default function MeeshoMall() {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-6">
      <div className="bg-white md:bg-transparent rounded-2xl p-4 md:p-0 shadow-sm md:shadow-none mb-8">
        <div className="relative overflow-hidden rounded-2xl h-[160px] md:h-[220px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg flex items-center justify-between p-6 md:p-10 text-white mb-8">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-md">
            <span className="inline-block bg-yellow-400 text-black text-[10px] md:text-xs font-black uppercase tracking-wider px-2 py-1 rounded mb-3 shadow-sm">
              Premium Brands
            </span>
            <h1 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">Meesho Mall</h1>
            <p className="text-sm md:text-base opacity-90 font-medium">100% Original Products. Top Brands at Unbeatable Prices.</p>
          </div>
          
          <div className="relative z-10 hidden md:block">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span className="text-4xl">🛍️</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-meesho-text-main mb-4 md:mb-6 px-2 md:px-0">Featured Brands</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {mallBrands.map((brand) => (
            <div 
              key={brand.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group"
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: brand.color }}
              >
                {brand.initials}
              </div>
              <div className="text-center">
                <h3 className="font-bold text-meesho-text-main text-sm md:text-base">{brand.name}</h3>
                <span className="inline-block bg-green-50 text-meesho-green text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full mt-1 border border-green-100">
                  {brand.discount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

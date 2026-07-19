"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "./context/AppContext";

import Header from "./components/Header";
import BannerSlider from "./components/BannerSlider";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import CategoriesView from "./components/CategoriesView";
import HelpSection from "./components/HelpSection";
import AccountSection from "./components/AccountSection";
import ProductCard from "./components/ProductCard";
import TrustBanner from "./components/TrustBanner";
import CategoryBar from "./components/CategoryBar";

export default function Home() {
  const { activeTab, wishlist, products } = useAppContext();
  
  // Deals of the day countdown timer
  const [timeLeft, setTimeLeft] = useState(13 * 60 + 54); // 13 minutes 54 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  
  const wishlistedProducts = products.filter(p => wishlist.has(p.id || p._id));

  return (
    <div className="flex flex-col w-full min-h-screen relative bg-[#f1f3f6]">
      <Header />

      <main className="flex-1 bg-[#f1f3f6]">
        {activeTab === "home" && (
          <>
            <div className="bg-white pb-2">
              <CategoryBar />
              <BannerSlider />
            </div>
            {/* Deals of the Day Section */}
            {/* Deals of the Day Section */}
            <div className="bg-white py-3 grid grid-cols-2 shadow-sm border-b border-gray-200">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-[19px] font-normal text-[#2874f0]">Deals of the Day</h2>
                <div className="flex items-center gap-1.5 text-[#2874f0] mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-[19px] font-normal">{formatTime(timeLeft)}</span>
                </div>
              </div>
              <div className="flex items-center justify-end pr-4">
                <button className="text-[#ff0000] border border-[#ff0000] px-3 py-1.5 text-[12px] font-bold bg-white rounded-[2px] shadow-sm">
                  SALE IS LIVE
                </button>
              </div>
            </div>

            <div className="w-full bg-white">
              <ProductGrid />
            </div>
          </>
        )}

        {activeTab === "categories" && <CategoriesView />}
        {activeTab === "mall" && (
          <div className="flex-1 flex items-center justify-center p-8">
            <h2 className="text-xl font-bold text-gray-500">Mall Features Coming Soon</h2>
          </div>
        )}
        {activeTab === "help" && <HelpSection />}
        {activeTab === "account" && <AccountSection />}
        
        {activeTab === "wishlist" && (
          <div className="w-full px-2 py-4">
            <h2 className="text-lg font-bold text-flipkart-text-main mb-4">Your Wishlist ({wishlistedProducts.length})</h2>
            {wishlistedProducts.length === 0 ? (
              <div className="flex-1 w-full flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg mt-2 shadow-sm">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-3xl">
                  ❤️
                </div>
                <h3 className="text-lg font-bold text-flipkart-text-main mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-500 mb-6 text-center max-w-xs text-sm">Save your favorite items here. Click the heart icon on any product to add it.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id || p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <CartDrawer />
    </div>
  );
}

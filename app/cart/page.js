"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";
import Header from "../components/Header";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQty, cartTotal } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-[100px] font-sans">
      <Header />

      <div className="w-full max-w-[600px] mx-auto px-2 mt-4">
        {/* Cart Header */}
        <div className="flex justify-between items-end mb-4 px-1">
          <div>
            <h1 className="text-[22px] font-bold text-[#212121] leading-tight">Shopping Cart</h1>
            <p className="text-[13px] text-[#878787] mt-0.5">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link href="/" className="text-[14px] font-medium text-[#2874f0] pb-1">
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-md shadow-sm border border-gray-200">
            <p className="text-[18px] font-semibold text-[#212121] mb-6">Your cart is feeling lonely</p>
            <Link href="/">
              <button className="bg-[#2874f0] text-white px-8 py-2.5 rounded-[2px] text-[14px] font-bold shadow-sm">Start shopping</button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex flex-col gap-3">
              {cart.map((item, index) => {
                const originalPrice = item.originalPrice || item.price + 100;
                
                return (
                  <div key={`${item.id || item._id}-${item.size}-${index}`} className="bg-white rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-gray-200 p-4">
                    {/* Image */}
                    <div className="w-[80px] h-[80px] flex-shrink-0 mb-3">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-[14px] font-bold text-[#212121] leading-[1.4] mb-1 line-clamp-2">
                      {item.title || item.name}
                    </h2>
                    
                    {/* Variant info */}
                    <div className="text-[12px] text-[#878787] mb-3">
                      Default • {item.size || "Standard"}
                    </div>
                    
                    {/* Price and Qty Line */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[16px] font-bold text-[#212121]">₹{item.price}</span>
                      <span className="text-[13px] text-[#878787] line-through">₹{originalPrice}</span>
                      <span className="text-[13px] font-medium text-[#388e3c] ml-1">Qty: {item.qty}</span>
                    </div>
                    
                    {/* Actions: Qty Control & Remove */}
                    <div className="flex items-end justify-between mt-2">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateCartQty(item.id || item._id, item.size, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-sm bg-white text-gray-600 text-[18px]"
                        >
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-y border-gray-300 text-[14px] font-medium text-[#212121]">
                          {item.qty}
                        </div>
                        <button 
                          onClick={() => updateCartQty(item.id || item._id, item.size, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-sm bg-white text-gray-600 text-[18px]"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id || item._id, item.size)}
                        className="text-[14px] text-[#ff6161] font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal Section */}
            <div className="bg-white rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-gray-200 p-4 mt-3 mb-6">
              <div className="text-[13px] text-[#878787] mb-1">Subtotal</div>
              <div className="text-[22px] font-bold text-[#212121] mb-5">₹{cartTotal.toFixed(2)}</div>
              
              <Link href="/address" className="block w-full">
                <button className="w-full bg-[#2874f0] text-white py-3.5 rounded-[2px] font-bold text-[15px] shadow-sm">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

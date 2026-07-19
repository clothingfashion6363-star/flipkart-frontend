"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { CloseIcon } from "./Icons";

export default function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    cartTotal,
    cartOriginalTotal,
    cartSubTotal,
    offerDiscount,
    settings
  } = useAppContext();

  if (!isCartOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalDiscount = offerDiscount;

  return (
    <>
      <div
        className="modal-overlay"
        style={{ animationDuration: '0.3s' }}
        onClick={() => setIsCartOpen(false)}
      />

      <div className="cart-drawer pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-meesho-text-main">
            My Cart {totalItems > 0 && <span className="text-meesho-purple text-base font-medium">({totalItems})</span>}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 flex flex-col gap-4">
          {totalDiscount > 0 && (
            <div className="bg-[#e4faed] text-[#038d63] text-xs font-bold py-2 px-3 rounded text-center mb-4 flex items-center justify-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Yay! You are saving ₹{totalDiscount} on this order
            </div>
          )}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-32 h-32 mb-6 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-meesho-text-main mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary w-full max-w-[200px]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {settings?.cartBannerUrl && (
                <a href={settings.cartBannerLink || '#'} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden shadow-sm">
                  <img src={settings.cartBannerUrl} alt="Offer" className="w-full h-auto" />
                </a>
              )}
              {cart.map((item) => (
                <div key={`${item.id || item._id}-${item.size}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                  <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
                  </div>

                  <div className="flex-1 flex flex-col min-w-0">
                    <h4 className="text-sm font-medium text-meesho-text-sub line-clamp-2 break-words mb-1">{item.title || item.name}</h4>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-bold text-meesho-text-main">₹{item.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{item.originalPrice || item.price + 100}</span>
                    </div>

                    <div className="text-xs text-gray-500 mb-auto">
                      Size: <span className="font-semibold text-gray-700">{item.size}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-8">
                        <button
                          onClick={() => updateCartQty(item.id || item._id, item.size, item.qty - 1)}
                          className="w-8 h-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                        >-</button>
                        <span className="w-8 h-full flex items-center justify-center text-sm font-medium border-x border-gray-300">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id || item._id, item.size, item.qty + 1)}
                          className="w-8 h-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                        >+</button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id || item._id, item.size)}
                        className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white p-5 border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="font-bold text-sm mb-3">Price Details ({totalItems} Items)</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-meesho-text-sub">
                <span>Total Product Price</span>
                <span>+ ₹{cartSubTotal}</span>
              </div>
              
              {offerDiscount > 0 && (
                <div className="flex justify-between text-[#CC5500] font-bold">
                  <span>Special Offers (Buy/Get)</span>
                  <span>- ₹{offerDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-meesho-green">FREE</span>
              </div>
              <div className="flex justify-between pt-3 mt-1 border-t border-dashed border-gray-300 font-bold text-base text-meesho-text-main">
                <span>Order Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsCartOpen(false);
                router.push("/address");
              }}
              className="btn-primary w-full text-lg py-3.5"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

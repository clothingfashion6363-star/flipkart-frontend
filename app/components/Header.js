"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen, handleTabChange } = useAppContext();
  
  const [localSearch, setLocalSearch] = useState("");

  const isProductPage = pathname && pathname.startsWith("/product/");

  const handleSearch = (e) => {
    setLocalSearch(e.target.value);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className={`header-wrapper ${isProductPage ? 'sticky top-0 z-50 shadow-sm' : ''}`}>
      <div className="w-full mx-auto">
        <div className="flex flex-col">
          {/* Top Row: Menu/Back, Logo, Icons */}
          <div className="header-inner py-3">
            <div className="flex items-center">
              {isProductPage ? (
                /* Back Button for PDP */
                <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center cursor-pointer mr-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
              ) : (
                /* Menu Icon for Home */
                <button className="w-8 h-8 flex items-center justify-center cursor-pointer mr-2">
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2 17.2222C2 17.8359 2.49746 18.3333 3.11111 18.3333H20.8889C21.5025 18.3333 22 17.8359 22 17.2222C22 16.6086 21.5025 16.1111 20.8889 16.1111H3.11111C2.49746 16.1111 2 16.6086 2 17.2222ZM2 11.6667C2 12.2803 2.49746 12.7778 3.11111 12.7778H20.8889C21.5025 12.7778 22 12.2803 22 11.6667C22 11.053 21.5025 10.5556 20.8889 10.5556H3.11111C2.49746 10.5556 2 11.053 2 11.6667ZM3.11111 5C2.49746 5 2 5.49746 2 6.11111C2 6.72476 2.49746 7.22222 3.11111 7.22222H20.8889C21.5025 7.22222 22 6.72476 22 6.11111C22 5.49746 21.5025 5 20.8889 5H3.11111Z" fill="#ffffff"></path>
                  </svg>
                </button>
              )}
              
              {/* Logo */}
              <button onClick={() => { router.push("/"); handleTabChange("home"); }} className="cursor-pointer ml-1 focus:outline-none flex items-center">
                <img src="/logo.png" alt="Flipkart Logo" className="h-8 object-contain max-w-[140px]" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </button>
            </div>

            <div className="flex items-center gap-4 pr-1">
              {!isProductPage && (
                <button className="icon-btn px-2" onClick={() => {}}>
                  <div className="bg-white rounded-sm w-[18px] h-[18px] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="4">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
              )}
              <button className="relative flex items-center justify-center cursor-pointer icon-btn" onClick={() => router.push('/cart')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-4 h-4 bg-[#ff0000] text-white rounded-full text-[10px] font-bold border-2 border-[#2874f0]">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Row: Search Bar (Only for Home Page) */}
          {!isProductPage && (
            <div className="px-3 pb-3 w-full">
              <div className="search-container">
                <div className="mr-2">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4564 12.0018L11.4426 14.0156L16.3498 18.9228C16.7013 19.2743 17.2711 19.2743 17.6226 18.9228L18.3636 18.1818C18.7151 17.8303 18.7151 17.2604 18.3636 16.909L13.4564 12.0018Z" fill="#878787"></path>
                    <path d="M14.7135 8.69842C14.7135 12.3299 11.7696 15.2738 8.13812 15.2738C4.50664 15.2738 1.56274 12.3299 1.56274 8.69842C1.56274 5.06694 4.50664 2.12305 8.13812 2.12305C11.7696 2.12305 14.7135 5.06694 14.7135 8.69842Z" fill="white" stroke="#878787" strokeWidth="1.5"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="search-input"
                  value={localSearch}
                  onChange={handleSearch}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

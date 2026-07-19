"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-meesho-dark text-[#a4a4b5] pt-12 pb-8 mt-auto border-t border-[#282833]">
      <div className="content-wrapper">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-white font-bold text-base mb-4">Shop Non-Stop on Meesho</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Trusted by more than 1 Crore Indians<br/>
              Cash on Delivery | Free Delivery
            </p>
            <div className="flex gap-3">
              <div className="bg-black border border-gray-700 rounded-md p-2 flex items-center gap-2 cursor-pointer hover:border-gray-500 transition-colors">
                <span className="text-2xl">📱</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase leading-none">Get it on</span>
                  <span className="text-white text-xs font-bold leading-tight">Google Play</span>
                </div>
              </div>
              <div className="bg-black border border-gray-700 rounded-md p-2 flex items-center gap-2 cursor-pointer hover:border-gray-500 transition-colors">
                <span className="text-2xl">🍎</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase leading-none">Download on the</span>
                  <span className="text-white text-xs font-bold leading-tight">App Store</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-base mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a supplier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hall of Fame</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-base mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Legal and Policies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Meesho Tech Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Notices and Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-base mb-4">Reach out to us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-meesho-purple transition-colors">f</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-meesho-purple transition-colors">in</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-meesho-purple transition-colors">yt</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-meesho-purple transition-colors">tw</a>
            </div>
            <h4 className="text-white font-bold text-base mb-2">Contact Us</h4>
            <p className="text-sm">query@meesho.com</p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700 text-center text-xs">
          <p>© 2026 Meesho Clone. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

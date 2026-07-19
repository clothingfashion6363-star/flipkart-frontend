"use client";

import React, { useState } from "react";
import { faqData } from "../data/banners";

export default function HelpSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto py-6">
      <div className="bg-white md:rounded-2xl md:shadow-sm md:border border-gray-200 p-5 md:p-8 min-h-[500px]">
        <h1 className="text-2xl font-bold text-meesho-text-main mb-2">Help Center</h1>
        <p className="text-gray-500 mb-8">How can we help you today?</p>

        {/* Support Agent Card */}
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 md:p-6 flex items-center gap-4 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-200/50 rounded-full blur-xl"></div>
          
          <div className="relative">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-meesho-purple text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md z-10 relative">
              S
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-meesho-green border-2 border-white rounded-full z-20"></div>
          </div>
          
          <div className="flex-1 z-10">
            <h3 className="font-bold text-meesho-text-main">Support Agent</h3>
            <p className="text-xs md:text-sm text-gray-500">Online • Typically replies in 5 mins</p>
          </div>
          
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-meesho-purple text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold shadow-md hover:bg-[#831570] transition-colors z-10 shrink-0"
          >
            Chat Now
          </button>
        </div>

        <h2 className="text-lg font-bold text-meesho-text-main mb-4">Frequently Asked Questions</h2>
        
        <div className="flex flex-col gap-3">
          {faqData.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-lg transition-all ${
                  isOpen ? "border-meesho-purple bg-purple-50/30 shadow-sm" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button 
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`font-semibold text-sm md:text-base ${isOpen ? "text-meesho-purple" : "text-meesho-text-main"}`}>
                    {faq.question}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-meesho-purple" : "text-gray-400"}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100/0">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isChatOpen && (
        <div className="modal-overlay z-[200]" onClick={() => setIsChatOpen(false)}>
          <div className="modal-content w-full md:w-[400px] h-[80vh] md:h-[600px] flex flex-col md:rounded-2xl rounded-t-2xl rounded-b-none mt-auto md:mt-0 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-meesho-purple p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">S</div>
                <div>
                  <h3 className="font-bold">Support Agent</h3>
                  <p className="text-xs text-white/80">Online</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white text-xl">✕</button>
            </div>
            
            <div className="flex-1 bg-gray-50 p-4 flex flex-col gap-4 overflow-y-auto">
              <div className="text-center text-xs text-gray-400 my-2">Today</div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm self-start">
                <p className="text-sm text-gray-700">Hi there! 👋 How can I help you today?</p>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-meesho-purple focus:ring-1 focus:ring-meesho-purple" />
              <button className="w-10 h-10 bg-meesho-purple text-white rounded-full flex items-center justify-center shrink-0 hover:bg-[#831570]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

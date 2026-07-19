"use client";

import React, { useState } from "react";
import { ChevronRight } from "./Icons";

export default function AccountSection() {
  const menuItems = [
    { id: 1, title: "My Orders", icon: "🛍️", type: "list" },
    { id: 2, title: "Meesho Payments & UPI", icon: "💳", type: "payments" },
    { id: 3, title: "My Saved Addresses", icon: "📍", type: "list" },
    { id: 4, title: "Shared Bank Details", icon: "🏦", type: "form" },
    { id: 5, title: "Settings & Permissions", icon: "⚙️", type: "settings" },
    { id: 6, title: "Logout", icon: "🚪", type: "logout" },
  ];

  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto py-6">
      <div className="bg-white md:rounded-2xl md:shadow-sm md:border border-gray-200 p-4 md:p-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-gray-500 mb-1">Meesho Credits</span>
            <span className="text-xl font-bold text-meesho-purple">₹150.00</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-gray-500 mb-1">Total Orders</span>
            <span className="text-xl font-bold text-meesho-purple">0</span>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveModal(item)}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 hover:border-meesho-purple/30 hover:shadow-sm transition-all text-left group shadow-sm"
            >
              <div className="text-meesho-purple opacity-80 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </div>
              <span className={`flex-1 font-bold text-sm md:text-base ${item.id === 6 ? 'text-red-500' : 'text-[#333333]'}`}>
                {item.title}
              </span>
              <ChevronRight className={`w-4 h-4 ${item.id === 6 ? 'text-red-400' : 'text-gray-400'} group-hover:text-meesho-purple transition-colors`} />
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Modal */}
      {activeModal && (
        <div className="modal-overlay z-[200]" onClick={() => setActiveModal(null)}>
          <div className="modal-content w-full md:w-[500px] h-auto p-6 flex flex-col md:rounded-2xl rounded-t-2xl rounded-b-none mt-auto md:mt-0 relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:bg-gray-100 p-2 rounded-full"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>{activeModal.icon}</span> {activeModal.title}
            </h2>
            
            {activeModal.type === "form" && (
              <form className="flex flex-col gap-4 mt-2" onSubmit={e => { e.preventDefault(); setActiveModal(null); alert("Saved successfully!"); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number / UPI ID</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-meesho-purple/20 focus:border-meesho-purple outline-none transition-all" placeholder="Enter details" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-meesho-purple/20 focus:border-meesho-purple outline-none transition-all" placeholder="Enter name" required />
                </div>
                <button type="submit" className="btn-primary mt-2">Save Details</button>
              </form>
            )}

            {activeModal.type === "list" && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4 grayscale opacity-60">
                  {activeModal.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">No data found</h3>
                <p className="text-sm text-gray-500">You don't have any records here yet.</p>
                <button onClick={() => setActiveModal(null)} className="btn-secondary mt-6 w-full">Go Back</button>
              </div>
            )}

            {activeModal.type === "payments" && (
              <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] pb-6 hide-scrollbar">
                {/* Linked UPI IDs */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-800 tracking-wider mb-4">LINKED UPI IDS</h3>
                  <div className="text-center text-sm text-gray-500 mb-5">
                    No UPI IDs linked yet.
                  </div>
                  
                  <div className="border border-dashed border-meesho-purple rounded-xl p-4 bg-purple-50/10">
                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Select App</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-meesho-purple focus:border-meesho-purple outline-none bg-white">
                        <option>Google Pay</option>
                        <option>PhonePe</option>
                        <option>Paytm</option>
                        <option>Amazon Pay</option>
                        <option>Other UPI App</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">UPI ID / VPA</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-meesho-purple focus:border-meesho-purple outline-none" placeholder="e.g. name@oksbi" />
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-meesho-purple text-white font-bold text-sm py-2 rounded-md hover:opacity-90 transition-colors">Link UPI</button>
                      <button className="flex-1 bg-gray-100 text-gray-600 font-bold text-sm py-2 rounded-md hover:bg-gray-200 transition-colors" onClick={(e) => { e.preventDefault(); setActiveModal(null); }}>Cancel</button>
                    </div>
                  </div>
                </div>

                {/* Saved Cards */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-800 tracking-wider mb-4">SAVED CARDS</h3>
                  <div className="text-center text-sm text-gray-500 mb-5">
                    No saved cards yet.
                  </div>
                  
                  <div className="border border-dashed border-meesho-purple rounded-xl p-4 bg-purple-50/10">
                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Bank Name</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-meesho-purple focus:border-meesho-purple outline-none" placeholder="e.g. HDFC Bank" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Card Number</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-meesho-purple focus:border-meesho-purple outline-none" placeholder="16-Digit Number" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Card Holder Name</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-meesho-purple focus:border-meesho-purple outline-none" placeholder="Name on card" />
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-meesho-purple text-white font-bold text-sm py-2 rounded-md hover:opacity-90 transition-colors">Save Card</button>
                      <button className="flex-1 bg-gray-100 text-gray-600 font-bold text-sm py-2 rounded-md hover:bg-gray-200 transition-colors" onClick={(e) => { e.preventDefault(); setActiveModal(null); }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModal.type === "settings" && (
              <div className="flex flex-col gap-4 mt-2">
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="font-medium text-sm text-gray-700">Push Notifications</span>
                  <input type="checkbox" defaultChecked className="accent-meesho-purple w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="font-medium text-sm text-gray-700">Email Updates</span>
                  <input type="checkbox" defaultChecked className="accent-meesho-purple w-4 h-4" />
                </label>
                <button onClick={() => setActiveModal(null)} className="btn-primary mt-4">Save Preferences</button>
              </div>
            )}
            
            {activeModal.type === "info" && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-gray-600 mb-6 leading-relaxed">Join the Meesho Community to connect with millions of resellers and shoppers. Share tips, get style advice, and grow together!</p>
                <button onClick={() => { setActiveModal(null); window.open("https://community.meesho.com", "_blank"); }} className="btn-primary w-full">Visit Community Forum</button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

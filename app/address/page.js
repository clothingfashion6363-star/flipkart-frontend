"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const InputField = ({ label, name, value, type = "text", onChange, error, className = "" }) => (
  <div className={`relative mb-3.5 w-full ${className}`}>
    <input 
      type={type}
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder=" "
      className={`peer w-full border rounded-[4px] px-3.5 pt-5 pb-2 outline-none text-[15px] font-medium text-[#212121] h-[52px] bg-white ${error ? 'border-[#ff6161]' : 'border-[#d7d7d7] focus:border-[#2874f0]'}`} 
    />
    <label className={`absolute left-3.5 transition-all duration-200 pointer-events-none 
      text-[11px] top-1.5 text-[#878787]
      peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3.5
      peer-focus:text-[11px] peer-focus:top-1.5 peer-focus:text-[#2874f0]
      ${error ? 'text-[#ff6161] peer-focus:text-[#ff6161]' : ''}`}>
      {label}
    </label>
  </div>
);

export default function AddressPage() {
  const { cart, isLoaded } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.push("/");
    }
  }, [cart.length, isLoaded, router]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    area: ""
  });
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("address");
    if (saved) {
      setFormData(JSON.parse(saved));
    } else {
      // Pick a random state by default
      const randomState = INDIAN_STATES[Math.floor(Math.random() * INDIAN_STATES.length)];
      setFormData(prev => ({ ...prev, state: randomState }));
    }
  }, []);

  if (!isLoaded || cart.length === 0) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.pincode || !formData.city || !formData.state || !formData.house || !formData.area) {
      setShowErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    localStorage.setItem("address", JSON.stringify(formData));
    
    // Check if coming from Buy Now
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("from") === "buy_now") {
      router.push("/payment");
    } else {
      router.push("/order-summary");
    }
  };

  return (
    <div className="min-h-screen bg-[#333333] flex justify-center font-sans">
      <div className="w-full max-w-[600px] bg-white flex flex-col relative min-h-screen shadow-lg">
        
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="text-[16px] font-medium text-[#212121]">Add delivery address</h1>
        </div>

        {/* Stepper */}
        <div className="bg-white py-4 px-4 border-b border-gray-100">
          <div className="flex items-center justify-between relative max-w-[320px] mx-auto">
            {/* Background line */}
            <div className="absolute top-3 left-[15%] right-[15%] h-[2px] bg-gray-200"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-[12px] font-bold mb-1 shadow-[0_0_0_4px_white]">
                1
              </div>
              <span className="text-[12px] text-[#212121] font-bold">Address</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-6 h-6 rounded-full border border-[#2874f0] bg-white text-[#2874f0] flex items-center justify-center text-[12px] font-bold mb-1 shadow-[0_0_0_4px_white]">
                2
              </div>
              <span className="text-[12px] text-[#878787]">Order Summary</span>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-6 h-6 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center text-[12px] font-bold mb-1 shadow-[0_0_0_4px_white]">
                3
              </div>
              <span className="text-[12px] text-[#878787]">Payment</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 py-5 flex-grow pb-[80px]">
          <InputField label="Full Name (Required)*" name="name" value={formData.name} onChange={handleChange} error={showErrors && !formData.name} />
          <InputField label="Mobile number (Required)*" name="phone" value={formData.phone} type="tel" onChange={handleChange} error={showErrors && !formData.phone} />
          <InputField label="Pincode (Required)*" name="pincode" value={formData.pincode} type="tel" onChange={handleChange} error={showErrors && !formData.pincode} />

          <div className="flex gap-3">
            <InputField label="City (Required)*" name="city" value={formData.city} onChange={handleChange} error={showErrors && !formData.city} className="flex-1" />
            <div className="relative mb-3.5 flex-1">
              <select 
                name="state" 
                value={formData.state} 
                onChange={handleChange}
                className={`peer w-full border rounded-[4px] px-3.5 pt-5 pb-2 outline-none text-[15px] font-medium text-[#212121] h-[52px] appearance-none bg-transparent relative z-10 ${showErrors && !formData.state ? 'border-[#ff6161]' : 'border-[#d7d7d7] focus:border-[#2874f0]'}`}
              >
                <option value="" disabled></option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <label className={`absolute left-3.5 transition-all duration-200 pointer-events-none z-0
                text-[11px] top-1.5 text-[#878787]
                ${!formData.state ? 'text-[14px] top-3.5' : ''}
                peer-focus:text-[11px] peer-focus:top-1.5 peer-focus:text-[#2874f0]
                ${showErrors && !formData.state ? 'text-[#ff6161]' : ''}`}>
                State (Required)*
              </label>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <InputField label="House No., Building Name (Required)*" name="house" value={formData.house} onChange={handleChange} error={showErrors && !formData.house} />
          <InputField label="Road name, Area, Colony (Required)*" name="area" value={formData.area} onChange={handleChange} error={showErrors && !formData.area} />
        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 max-w-[600px] mx-auto z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <button onClick={handleSave} className="w-full bg-[#ffc200] text-[#212121] py-3.5 rounded-[2px] font-bold text-[16px] shadow-sm">
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

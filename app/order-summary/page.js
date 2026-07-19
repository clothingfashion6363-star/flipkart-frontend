"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import CashfreeCheckout from "../../components/payment/CashfreeCheckout";

export default function OrderSummaryPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQty, cartTotal, cartOriginalTotal, isLoaded, settings } = useAppContext();
  const [address, setAddress] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("address");
    if (saved) {
      setAddress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.push("/");
    }
  }, [cart.length, isLoaded, router]);

  if (!mounted || !isLoaded || cart.length === 0) return null;

  const totalDiscount = cartOriginalTotal > cartTotal ? cartOriginalTotal - cartTotal : 0;

  return (
    <div className="min-h-screen bg-[#333333] flex justify-center font-sans">
      <div className="w-full max-w-[600px] bg-[#f1f3f6] flex flex-col relative min-h-screen shadow-lg pb-[80px]">
        
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="text-[16px] font-medium text-[#212121]">Order Summary</h1>
        </div>

        {/* Stepper */}
        <div className="bg-white py-4 px-4 border-b border-gray-100">
          <div className="flex items-center justify-between relative max-w-[320px] mx-auto">
            {/* Background line */}
            <div className="absolute top-3 left-[15%] right-[15%] h-[2px] bg-gray-200"></div>
            
            {/* Step 1 - Completed */}
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-6 h-6 rounded-full border border-[#2874f0] bg-white text-[#2874f0] flex items-center justify-center text-[14px] font-bold mb-1 shadow-[0_0_0_4px_white]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-[12px] text-[#878787]">Address</span>
            </div>
            
            {/* Step 2 - Active */}
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-[12px] font-bold mb-1 shadow-[0_0_0_4px_white]">
                2
              </div>
              <span className="text-[12px] text-[#212121] font-bold">Order Summary</span>
            </div>
            
            {/* Step 3 - Pending */}
            <div className="flex flex-col items-center flex-1 z-10">
              <div className="w-6 h-6 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center text-[12px] font-bold mb-1 shadow-[0_0_0_4px_white]">
                3
              </div>
              <span className="text-[12px] text-[#878787]">Payment</span>
            </div>
          </div>
        </div>

        {/* Address Block */}
        <div className="bg-white px-4 py-4 mt-2">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-[14px] font-bold text-[#212121]">Deliver to:</h2>
            <button 
              onClick={() => router.push("/address")}
              className="text-[#2874f0] text-[13px] font-medium border border-[#e0e0e0] rounded px-3 py-1 shadow-sm"
            >
              Change
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[15px] font-bold text-[#212121]">{address?.name || "Customer Name"}</span>
            <span className="bg-[#f0f0f0] text-[#878787] text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase">Home</span>
          </div>
          <p className="text-[13px] text-[#212121] leading-snug mb-1">
            {address ? `${address.house}, ${address.area}, ${address.city}, ${address.state}` : "123 Main Street, City, State"}
          </p>
          <p className="text-[13px] text-[#212121] font-medium">{address?.phone || "9876543210"}</p>
        </div>

        {/* Cart Block */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-[15px] font-bold text-[#212121]">Your Cart</h2>
              <p className="text-[12px] text-[#878787]">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
            </div>
            <div className="text-[14px] font-bold text-[#212121]">
              Subtotal ₹{cartTotal.toFixed(2)}
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-md">
            {cart.map((item, index) => {
              const originalPrice = item.originalPrice || item.price + 100;
              return (
                <div key={index} className="p-3 border-b border-gray-100 last:border-0">
                  <div className="flex">
                    <div className="w-[70px] h-[70px] flex-shrink-0 mr-3">
                      <img src={item.image} alt="Product" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <h3 className="text-[13px] font-bold text-[#212121] leading-tight line-clamp-2 mb-1">
                        {item.title || item.name}
                      </h3>
                      <div className="text-[11px] text-[#878787] mb-1">
                        Default | {item.size || "Standard"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#212121]">₹{item.price}</span>
                        <span className="text-[12px] text-[#878787] line-through">₹{originalPrice}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateCartQty(item.id || item._id, item.size, item.qty - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white text-gray-600 text-[16px] rounded-l-sm"
                          >
                            -
                          </button>
                          <div className="w-8 h-7 flex items-center justify-center border-y border-gray-300 text-[13px] font-medium text-[#212121]">
                            {item.qty}
                          </div>
                          <button 
                            onClick={() => updateCartQty(item.id || item._id, item.size, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white text-gray-600 text-[16px] rounded-r-sm"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id || item._id, item.size)}
                          className="text-[13px] font-bold text-[#ff6161]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#f0f5ff] flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-[#ffebe6] flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d71920" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <span className="text-[12px] text-[#212121]">Cancellation is allowed up to 48 hours after placing the order.</span>
        </div>

        <div className="bg-white flex items-center justify-between px-4 py-3 mt-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className="text-[14px] text-[#212121]">Invoice</span>
          </div>
          <button className="text-[#2874f0] text-[13px] font-medium">Add Email</button>
        </div>

        {/* VIP Banner */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <div className="w-[50px] h-[50px] bg-[#2874f0] rounded flex flex-col items-center justify-center flex-shrink-0 text-white relative overflow-hidden">
             <span className="text-[10px] font-bold text-yellow-300 relative z-10 mb-1">VIP</span>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc200" className="absolute opacity-80" style={{top: '-4px'}}>
               <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
             </svg>
          </div>
          <div className="flex flex-col flex-grow">
            <span className="text-[13px] font-bold text-[#212121]">Get Benefit Worth of ₹10000 Per Year</span>
            <span className="text-[11px] text-[#212121] leading-snug">For Exclusive Discount up to 80% on All product up to 12 Months. Limited Time Offer | Become VIP Member</span>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[13px] font-bold text-[#212121]">₹199 For 12 Months</span>
              <button className="bg-[#ffc200] text-[#212121] text-[11px] font-bold px-3 py-1.5 rounded-[2px]">Get VIP Member</button>
            </div>
          </div>
        </div>

        {/* Direct UPI Payment Donation */}
        <div className="bg-white px-4 py-4 mt-2">
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#212121]">Direct UPI Payment</span>
              <span className="text-[12px] text-[#878787]">Support transformative social work in India</span>
            </div>
            <div className="flex">
              <div className="w-16 h-11 overflow-hidden rounded-[2px] shadow-sm">
                <img src="/Image (1).png" className="w-full h-full object-cover" alt="donate" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            {["₹10", "₹20", "₹50", "₹100"].map(amt => (
              <button key={amt} className="flex-1 py-1.5 border border-gray-300 rounded-full text-[13px] text-[#212121] font-medium bg-white shadow-sm">
                {amt}
              </button>
            ))}
          </div>
          <div className="mt-4 text-[12px] font-bold text-[#878787] opacity-80">
            Note: GST and No cost EMI will not be applicable
          </div>
        </div>

        <div className="bg-[#e6f4ea] px-4 py-3 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
          </svg>
          <span className="text-[12px] text-[#212121]">Continue to the next page for Bank Offers.</span>
        </div>

        {/* Price Details */}
        <div className="bg-white px-4 py-4 mt-2 mb-2">
          <h2 className="text-[15px] font-bold text-[#212121] mb-4">Price Details</h2>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] text-[#212121]">Price ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
            <span className="text-[14px] text-[#212121]">₹{cartOriginalTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] text-[#212121]">Discount</span>
            <span className="text-[14px] text-[#388e3c]">-₹{totalDiscount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3">
            <span className="text-[14px] text-[#212121]">Delivery Charges</span>
            <span className="text-[14px] text-[#388e3c]">FREE Delivery</span>
          </div>
          
          <div className="flex justify-between items-center mb-4 pt-1">
            <span className="text-[16px] font-bold text-[#212121]">Total Amount</span>
            <span className="text-[16px] font-bold text-[#212121]">₹{cartTotal.toFixed(2)}</span>
          </div>
          
          {totalDiscount > 0 && (
            <div className="text-[13px] font-medium text-[#388e3c]">
              You will save -₹{totalDiscount.toFixed(2)} on this order
            </div>
          )}
          
          <div className="mt-4 flex items-center gap-2 justify-center opacity-70">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="gray"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></svg>
             <span className="text-[12px] font-bold text-gray-500">Safe and secure payments. Easy</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[600px] mx-auto bg-white border-t border-gray-200 z-50">
          <div className="flex justify-between items-center p-3">
            <div className="flex flex-col pl-1">
              <span className="text-[12px] text-[#878787] line-through leading-none mb-0.5">₹{cartOriginalTotal.toFixed(2)}</span>
              <span className="text-[20px] font-bold text-[#212121] leading-none">₹{cartTotal.toFixed(2)}</span>
            </div>
            {/* {settings?.upiGateway === 'cashfree' ? (
              <CashfreeCheckout 
                cartTotal={cartTotal} 
                buttonText="Continue To Payment"
                customClass="bg-[#ffc200] text-[#212121] px-10 py-3 rounded-[2px] font-bold text-[15px]"
              />
            ) : (
              <button 
                onClick={() => router.push("/payment")}
                className="bg-[#ffc200] text-[#212121] px-10 py-3 rounded-[2px] font-bold text-[15px]"
              >
                Continue To Payment
              </button>
            )} */}
            <button 
              onClick={() => router.push("/payment")}
              className="bg-[#ffc200] text-[#212121] px-10 py-3 rounded-[2px] font-bold text-[15px]"
            >
              Continue To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

export default function OfferTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 20, seconds: 0 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage if exists
    const storedH = parseInt(localStorage.getItem('timerHours'));
    const storedM = parseInt(localStorage.getItem('timerMinutes'));
    const storedS = parseInt(localStorage.getItem('timerSeconds'));
    
    if (!isNaN(storedH) && !isNaN(storedM) && !isNaN(storedS)) {
      setTimeLeft({ hours: storedH, minutes: storedM, seconds: storedS });
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              // Reset if hit 0
              hours = 0;
              minutes = 20;
              seconds = 0;
            }
          }
        }
        
        localStorage.setItem('timerHours', hours);
        localStorage.setItem('timerMinutes', minutes);
        localStorage.setItem('timerSeconds', seconds);
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  // Prevent hydration mismatch by rendering a generic or empty timer until mounted
  if (!mounted) {
    return (
      <div className="bg-white py-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[17px] flex items-center" style={{color: '#4e5b72'}}>
            Meesho Daily Deals
            <span className="ml-1 mt-0.5">
              <svg width="19" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block w-[18px] h-[20px]">
                <mask id="deal_svg__a" maskType="alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="17" height="22">
                  <path d="M5.198.795a.73.73 0 0 0-.699.522l-2.621 8.858a1.458 1.458 0 0 0 1.568 1.862l6.018-.708L6.835 19.8a1.089 1.089 0 0 0 1.944.929l8.174-12.206c.698-1.043-.16-2.423-1.405-2.257l-5.033.671 1.724-5.183a.73.73 0 0 0-.692-.96H5.198Z" fill="#fff"></path>
                </mask>
                <g mask="url(#deal_svg__a)">
                  <path fill="#E11900" d="M-.208.947H18.75v21.875H-.208z"></path>
                </g>
              </svg>
            </span>
          </span>
          
          <div className="flex items-center border border-[#ff8f50] bg-[#fffbf9] rounded-[4px] px-1.5 py-0.5 ml-1">
            <img alt="Offer clock icon" width="14" height="14" className="mr-1" src="https://images.meesho.com/images/offer-widget-group-icon/T1W36/7tepb.png" />
            <span className="text-meesho-purple font-bold text-[13px]">
              00h:20m:00s
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-4 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-[17px] flex items-center" style={{color: '#4e5b72'}}>
          Meesho Daily Deals
          <span className="ml-1 mt-0.5">
            <svg width="19" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block w-[18px] h-[20px]">
              <mask id="deal_svg__a" maskType="alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="17" height="22">
                <path d="M5.198.795a.73.73 0 0 0-.699.522l-2.621 8.858a1.458 1.458 0 0 0 1.568 1.862l6.018-.708L6.835 19.8a1.089 1.089 0 0 0 1.944.929l8.174-12.206c.698-1.043-.16-2.423-1.405-2.257l-5.033.671 1.724-5.183a.73.73 0 0 0-.692-.96H5.198Z" fill="#fff"></path>
              </mask>
              <g mask="url(#deal_svg__a)">
                <path fill="#E11900" d="M-.208.947H18.75v21.875H-.208z"></path>
              </g>
            </svg>
          </span>
        </span>
        
        <div className="flex items-center border border-[#ff8f50] bg-[#fffbf9] rounded-[4px] px-1.5 py-0.5 ml-1">
          <img alt="Offer clock icon" width="14" height="14" className="mr-1" src="https://images.meesho.com/images/offer-widget-group-icon/T1W36/7tepb.png" />
          <span suppressHydrationWarning className="text-meesho-purple font-bold text-[13px]">
            {formatNum(timeLeft.hours)}h:{formatNum(timeLeft.minutes)}m:{formatNum(timeLeft.seconds)}s
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Marquee() {
  const { settings } = useAppContext();

  if (!settings?.offers || settings.offers.length === 0) return null;

  // Repeat offers a few times to ensure smooth scrolling
  const displayOffers = [];
  for(let i=0; i<6; i++) {
    settings.offers.forEach(offer => displayOffers.push(offer));
  }

  // Format offer text: dynamically handle codes like b1g1
  const formatOffer = (offer) => {
    const lowerOffer = offer.toLowerCase();
    const match = lowerOffer.match(/^b(\d+)g(\d+)$/);
    if (match) {
      const buy = parseInt(match[1], 10);
      const get = parseInt(match[2], 10);
      const total = buy + get;
      return `Buy ${buy} Get ${get} Free (Add ${total} items to cart)`;
    }
    return offer.toUpperCase();
  };

  return (
    <div 
      className="w-full overflow-hidden py-3.5 mt-2 shadow-sm" 
      style={{ backgroundColor: settings.primaryColor || '#CC5500' }}
    >
      <div className="flex whitespace-nowrap animate-[marquee_15s_linear_infinite] items-center">
        {displayOffers.map((offer, idx) => (
          <React.Fragment key={idx}>
            <span className="text-white text-lg font-extrabold px-6 tracking-wider drop-shadow-md">{formatOffer(offer)}</span>
            <span className="text-white text-lg font-extrabold px-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";

export default function CategoryBar() {
  const { handleTabChange, setCategoryFilter } = useAppContext();

  // Hardcoded categories to match the screenshot using images from public folder
  const flipkartCategories = [
    { id: "all", name: "Categories", image: "/download (3).webp", isAll: true },
    { id: "offer", name: "Offer Zone", image: "/download.webp" },
    { id: "mobiles", name: "Mobiles", image: "/download (1).webp" },
    { id: "fashion", name: "Fashion", image: "/download (2).webp" },
    { id: "electronics", name: "Electronics", image: "/download (4).webp" },
    { id: "appliances", name: "Appliances", image: "/download (5).webp" },
    { id: "home", name: "Home", image: "/download (6).webp" },
    { id: "personal-care", name: "Personal Care", image: "/download (7).webp" },
    { id: "toys-baby", name: "Toys & Baby", image: "/download (8).webp" },
    { id: "furniture", name: "Furniture", image: "/download (9).webp" },
    { id: "flights", name: "Flights & Hotel", image: "/download (10).webp" },
    { id: "sports", name: "Sports", image: "/download (11).webp" },
    { id: "nutrition", name: "Nutrition & more", image: "/download (12).webp" },
    { id: "insurance", name: "Insurance", image: "/download (13).webp" },
    { id: "gift-cards", name: "Gift Cards", image: "/356d37e9512c7fcb-CxmGO5wA.webp" },
  ];

  return (
    <div className="flex items-start justify-between overflow-x-auto px-2 py-3 bg-white border-b-2 border-gray-100 no-scrollbar gap-2">
      {flipkartCategories.map((cat, index) => (
        <button
          key={cat.id}
          onClick={() => {}}
          className="flex flex-col items-center min-w-[56px] relative flex-shrink-0"
        >
          <div className="w-[68px] h-[68px] flex items-center justify-center">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
          </div>
        </button>
      ))}
    </div>
  );
}

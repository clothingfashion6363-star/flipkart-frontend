"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function CategoriesView() {
  const { setCategoryFilter, handleTabChange, categories } = useAppContext();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (categories && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || categories[0]._id);
    }
  }, [categories, activeCategory]);

  const handleSubcategoryClick = (catId, subCatName) => {
    setCategoryFilter(catId);
    handleTabChange("home");
  };

  if (!categories || categories.length === 0 || !activeCategory) return <div className="flex-1 w-full flex items-center justify-center p-8">Loading categories...</div>;

  const currentCategory = categories.find(c => (c.id === activeCategory || c._id === activeCategory)) || categories[0];

  return (
    <div className="flex-1 w-full flex bg-[#f1f3f6] pt-0 h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-[85px] flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto no-scrollbar shadow-sm z-10">
        {categories.map((cat) => (
          <button
            key={cat.id || cat._id}
            onClick={() => setActiveCategory(cat.id || cat._id)}
            className={`w-full flex flex-col items-center gap-1.5 p-3 border-b border-gray-100 transition-all ${
              activeCategory === (cat.id || cat._id) 
                ? "bg-[#e5f0ff] border-l-4 border-l-flipkart-blue text-flipkart-blue font-bold" 
                : "text-gray-600 hover:bg-gray-50 font-medium border-l-4 border-l-transparent"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${
              activeCategory === (cat.id || cat._id) ? "bg-white" : "bg-gray-50"
            } border border-gray-200 shadow-sm overflow-hidden`}>
              {cat.icon}
            </div>
            <span className="text-[10px] text-center leading-tight break-words">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto p-3 bg-white">
        <div className="mb-20">
          <h2 className="text-lg font-bold text-flipkart-text-main mb-3">
            {currentCategory.name}
          </h2>
          
          <div className="w-full h-24 rounded-lg overflow-hidden mb-5 relative group cursor-pointer shadow-sm" onClick={() => handleSubcategoryClick(currentCategory.id || currentCategory._id)}>
            <img 
              src={currentCategory.image} 
              alt={currentCategory.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {currentCategory.subcategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => handleSubcategoryClick(currentCategory.id || currentCategory._id, sub.name)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:border-flipkart-blue transition-all">
                  <img 
                    src={sub.image} 
                    alt={sub.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[11px] font-medium text-center text-flipkart-text-sub group-hover:text-flipkart-blue transition-colors leading-tight">
                  {sub.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { sortOptions, priceRanges } from "../data/products";
import { FilterIcon } from "./Icons";

export default function MobileFilterBar() {
  const { 
    isMobileFilterOpen, 
    setIsMobileFilterOpen,
    isMobileSortOpen,
    setIsMobileSortOpen,
    filters,
    setFilters
  } = useAppContext();

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
    setIsMobileSortOpen(false);
  };

  const handlePriceChange = (range) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange?.min === range.min ? null : range,
    }));
  };

  const clearFilters = () => {
    setFilters({
      ...filters,
      priceRange: null,
      minRating: null,
    });
    setIsMobileFilterOpen(false);
  };

  const hasActiveFilters = filters.priceRange || filters.minRating;

  return (
    <>
      {/* Mobile Filter Bar (Sticky) */}
      <div className="md:hidden sticky top-[108px] z-30 grid grid-cols-2 bg-white border-y border-gray-200 -mx-4">
        <button 
          className="flex items-center justify-center gap-2 py-3 text-[13px] font-medium text-meesho-text-main border-r border-gray-200"
          onClick={() => setIsMobileSortOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
          Sort
        </button>
        <button 
          className="flex items-center justify-center gap-2 py-3 text-[13px] font-medium text-meesho-text-main relative"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <FilterIcon className="w-4 h-4" />
          Filter
          {hasActiveFilters && (
            <span className="absolute top-2 right-6 w-2 h-2 bg-meesho-pink rounded-full"></span>
          )}
        </button>
      </div>

      {/* Sort Modal */}
      {isMobileSortOpen && (
        <div className="modal-overlay" onClick={() => setIsMobileSortOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Sort By</h3>
              <button onClick={() => setIsMobileSortOpen(false)}>✕</button>
            </div>
            <div className="flex flex-col p-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`p-4 text-left border-b border-gray-50 text-sm ${
                    filters.sortBy === opt.value ? "font-bold text-meesho-purple" : "text-gray-700"
                  }`}
                  onClick={() => handleSortChange(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {isMobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Filters</h3>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm font-bold text-meesho-pink">
                  Clear All
                </button>
              )}
            </div>
            
            <div className="flex h-[50vh] overflow-hidden">
              {/* Left Tabs */}
              <div className="w-1/3 bg-gray-50 border-r border-gray-200">
                <div className="p-4 text-sm font-bold bg-white border-l-4 border-meesho-purple">
                  Price
                </div>
              </div>
              
              {/* Right Content */}
              <div className="w-2/3 p-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {priceRanges.map((range, idx) => {
                    const isChecked = filters.priceRange?.min === range.min;
                    return (
                      <label key={idx} className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handlePriceChange(range)}
                          className="w-5 h-5 text-meesho-purple rounded border-gray-300"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Apply Button */}
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

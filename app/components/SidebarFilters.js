"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { priceRanges, ratingFilters, sortOptions } from "../data/products";
import { FilterIcon } from "./Icons";

export default function SidebarFilters() {
  const { filters, setFilters, categories } = useAppContext();

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, category: value === "all" ? null : value }));
  };

  const handlePriceChange = (e, range) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: e.target.checked ? range : null,
    }));
  };

  const handleRatingChange = (e, rating) => {
    setFilters((prev) => ({
      ...prev,
      minRating: e.target.checked ? rating.value : null,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: null,
      priceRange: null,
      minRating: null,
      sortBy: "relevance",
    });
  };

  const hasActiveFilters = filters.category || filters.priceRange || filters.minRating || filters.sortBy !== "relevance";

  return (
    <div className="hidden md:flex flex-col w-[260px] flex-shrink-0 bg-white border border-meesho-border rounded-xl shadow-meesho-sm sticky top-[150px] p-5 self-start max-h-[calc(100vh-170px)] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 sticky top-0 bg-white z-10">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FilterIcon className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-xs font-bold text-meesho-pink hover:text-meesho-purple transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3">Sort By</h4>
        <select 
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-meesho-purple focus:ring-1 focus:ring-meesho-purple outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Category Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3">Category</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="cat" 
              value="all"
              checked={filters.category === null}
              onChange={handleCategoryChange}
              className="w-4 h-4 text-meesho-purple focus:ring-meesho-purple border-gray-300 cursor-pointer"
            />
            <span className="text-sm group-hover:text-meesho-purple transition-colors">All Categories</span>
          </label>
          {categories && categories.map((cat) => (
            <label key={cat.id || cat._id} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="cat" 
                value={cat.id || cat._id}
                checked={filters.category === (cat.id || cat._id)}
                onChange={handleCategoryChange}
                className="w-4 h-4 text-meesho-purple focus:ring-meesho-purple border-gray-300 cursor-pointer"
              />
              <span className="text-sm group-hover:text-meesho-purple transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3">Price</h4>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range, idx) => {
            const isChecked = filters.priceRange?.min === range.min && filters.priceRange?.max === range.max;
            return (
              <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={(e) => handlePriceChange(e, range)}
                  className="w-4 h-4 text-meesho-purple rounded focus:ring-meesho-purple border-gray-300 cursor-pointer"
                />
                <span className="text-sm group-hover:text-meesho-purple transition-colors">{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating Section */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Rating</h4>
        <div className="flex flex-col gap-2">
          {ratingFilters.map((rating, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.minRating === rating.value}
                onChange={(e) => handleRatingChange(e, rating)}
                className="w-4 h-4 text-meesho-purple rounded focus:ring-meesho-purple border-gray-300 cursor-pointer"
              />
              <span className="text-sm flex items-center gap-1 group-hover:text-meesho-purple transition-colors">
                {rating.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

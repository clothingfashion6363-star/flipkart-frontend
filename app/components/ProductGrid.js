"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { filteredProducts, searchQuery } = useAppContext();

  return (
    <div className="flex-1 w-full bg-gray-200 mt-1">

      {filteredProducts.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] md:gap-4 bg-gray-200 md:bg-transparent">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg md:rounded-xl overflow-hidden border border-gray-200">
              <div className="relative w-full pt-[130%] bg-gray-100 animate-pulse"></div>
              <div className="flex flex-col p-2.5">
                <div className="h-4 bg-gray-100 rounded w-[90%] mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-[60%] mb-3 animate-pulse"></div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 bg-gray-100 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-10 animate-pulse"></div>
                </div>
                <div className="h-5 bg-green-50 rounded w-24 mb-1 animate-pulse"></div>
                <div className="h-5 bg-green-50 rounded w-20 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-16 mt-1 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] md:gap-4 bg-gray-200 md:bg-transparent">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

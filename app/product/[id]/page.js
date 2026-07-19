"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import Marquee from "../../components/Marquee";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, clearCart, wishlist, toggleWishlist, loading, cart, setIsCartOpen, handleTabChange, settings } = useAppContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showSizeError, setShowSizeError] = useState(false);
  const sizeSectionRef = useRef(null);
  const imageScrollRef = useRef(null);

  useEffect(() => {
    if (!loading && products) {
      const foundProduct = products.find(p => (p.id === id || p._id === id || String(p.id) === id || String(p._id) === id));
      setProduct(foundProduct || null);
    }
  }, [id, products, loading]);

  // Auto-scroll logic for images
  useEffect(() => {
    if (product) {
      const displayImages = (product.images && product.images.length > 0) 
        ? product.images 
        : [product.img1, product.img2, product.img3, product.img4, product.img5].filter(Boolean);
      
      if (displayImages.length > 1) {
        const interval = setInterval(() => {
          if (imageScrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = imageScrollRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
              imageScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
            } else {
              imageScrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
            }
          }
        }, 2000);
        return () => clearInterval(interval);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const fetchReviews = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
          const res = await fetch(`${apiUrl}/reviews`);
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              setReviews((data.data || []).slice(0, 5));
            }
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
      fetchReviews();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading product...</div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <button onClick={() => router.push("/")} className="btn-primary px-8">Back to Home</button>
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlist.has(product.id || product._id);
  const originalPrice = product.originalPrice || product.price + 100;
  const discount = product.discount || (originalPrice > product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 20);
  const availableSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  const idStr = String(product.id || product._id || "123");
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = ((hash << 5) - hash) + idStr.charCodeAt(i);
    hash |= 0;
  }
  const variance = Math.abs(hash) + product.price;
  const numOffers = (variance % 3) + 1;
  const discountAmount = 15 + (variance % 35);
  
  const brandNames = ["Nutraj", "Happilo", "Tulsi", "Farmley", "Rostaa", "Nutty Gritties", "Tong Garden", "Vedaka", "Omaxe", "GreenFinity", "Wonderland Foods", "King Uncle", "NutriHub", "ProV", "Miltop", "Ministry of Nuts", "Naturoz", "Carnival"];
  const productBrand = product.brand || brandNames[Math.abs(hash) % brandNames.length];

  const handleAddToCart = () => {
    const size = selectedSize || "Standard";
    addToCart(product, size, 1, false);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    const size = selectedSize || "Standard";
    clearCart();
    addToCart(product, size, 1, false);
    router.push("/address?from=buy_now");
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-[60px] font-sans">
      <Header />

      {/* Product Image Section */}
      <div className="w-full bg-white max-w-[600px] mx-auto pb-4 relative">
        <div ref={imageScrollRef} className="w-full relative bg-white flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {(() => {
            const displayImages = (product.images && product.images.length > 0) 
              ? product.images 
              : [product.img1, product.img2, product.img3, product.img4, product.img5].filter(Boolean);
            
            if (displayImages.length === 0 && product.image) {
              displayImages.push(product.image);
            }

            return displayImages.map((img, idx) => (
              <div key={idx} className="w-full shrink-0 relative aspect-[5/4] flex items-center justify-center p-6 snap-center">
                <img src={img} alt={`${product.title || product.name} - ${idx + 1}`} className="w-full h-full object-contain" />
              </div>
            ));
          })()}
        </div>
        {/* Pagination Dots (Only if multiple images) */}
        {(() => {
           const displayImages = (product.images && product.images.length > 0) 
             ? product.images 
             : [product.img1, product.img2, product.img3, product.img4, product.img5].filter(Boolean);
           if (displayImages.length > 1) {
             return (
               <div className="flex justify-center gap-2 mt-2">
                 {displayImages.map((_, idx) => (
                   <div key={idx} className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-[#2874f0] w-4' : 'bg-[#e0e0e0]'}`}></div>
                 ))}
               </div>
             );
           }
           return null;
        })()}
      </div>

      {/* Stock Alert */}
      <div className="w-full bg-[#f8f9fa] max-w-[600px] mx-auto py-2.5 border-b border-gray-100 flex justify-center">
        <span className="text-[14px] font-bold text-[#212121]">Only <span className="text-[#ff4343]">11</span> Left in Stock</span>
      </div>

      {/* Title & Info */}
      <div className="w-full bg-white max-w-[600px] mx-auto px-4 py-3">
        <div className="text-[14px] text-[#212121] font-medium leading-snug">{product.title || product.name}</div>
        
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2">
            <div className="bg-[#388e3c] text-white px-1.5 py-0.5 rounded-[2px] flex items-center gap-1 text-[12px] font-bold">
              {product.rating || "4.7"} <span className="text-[10px]">★</span>
            </div>
            <span className="text-[12px] text-[#878787] font-medium">{product.reviews || 7657} Ratings</span>
          </div>
          <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png" alt="Plus Assured" className="h-[21px]" />
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-end gap-2">
          <span className="text-[26px] font-bold text-[#212121] leading-none">₹{product.price}</span>
          <span className="text-[14px] text-[#878787] line-through leading-none pb-1">₹{originalPrice}</span>
          <span className="text-[13px] font-bold text-[#388e3c] leading-none pb-1">{discount}% off</span>
        </div>
      </div>

      {/* Trending Banner */}
      <div className="w-full bg-white max-w-[600px] mx-auto border-t border-b border-gray-100 px-4 py-3 mt-2 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#e6f7f4] flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#038D63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>
        <span className="text-[13px] text-[#212121]"><span className="text-[#d71920] font-bold text-[14px]">27937</span> people ordered this recently</span>
      </div>

      {/* Offer Ends Banner */}
      <div className="w-full bg-[#fffdf7] max-w-[600px] mx-auto border-b border-[#ffe7d1] px-4 py-3.5 flex justify-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <span className="text-[13px] text-[#212121]">Offer ends in <span className="text-[#ff6161] font-bold text-[14px]">16m 23s</span></span>
      </div>

      {/* Delivery Info */}
      <div className="w-full bg-white max-w-[600px] mx-auto px-4 py-4 border-b border-gray-100 mt-2">
        <div className="flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <div>
            <div className="text-[14px]">
              <span className="text-[#388e3c] font-bold">FREE Delivery</span> <span className="text-[#e0e0e0] px-1">|</span> <span className="font-bold text-[#212121]">Delivery by Sat, Jul 4</span>
            </div>
            <div className="text-[12px] text-gray-500 mt-1">If ordered within <span className="text-[#ff6161]">15m 2s</span></div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="w-full bg-white max-w-[600px] mx-auto px-4 py-4 mt-2">
        <h6 className="text-[16px] font-bold text-[#212121] mb-3 border-b border-gray-200 pb-3">Product Description</h6>
        
        <div className="text-[13px] text-[#212121] leading-[1.6]">
          <p className="mb-2">This is a <span className="font-bold">Vegetarian</span> product.</p>
          <div className="w-full h-[1px] bg-gray-200 mb-2"></div>
          <p>Premium Quality Dry Fruits Combo: Includes Almonds, Cashews, Pistachios, and Raisins for a perfect mix of real nuts and dried fruits for a tasty, delicious, and healthy snack. High in Protein & Fiber: Rich in protein, fiber, and healthy fats, these dry fruits are an excellent choice to fuel your body and keep you full for longer. Ideal for those looking to boost their muscle health, energy levels, and digestion. Boost Immunity & Health: Packed with vitamins, antioxidants, and minerals, this combo pack helps boost immunity, promote heart health, and improve overall health and vitality. Gluten-Free & Natural: Organic Purify Dry Fruits Combo Pack contains no gluten, preservatives, or artificial additives, providing a clean, natural, and wholesome snacking experience. Generous 4KG Pack: With 1kg each of Almonds, Cashews, Pistachios, and Raisins (total of 4kg), this combo pack offers great value and is perfect for families, parties, or sharing with friends.</p>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-gray-500">Brand:</span>
              <span className="text-[15px] font-bold text-[#212121]">{productBrand}</span>
            </div>
            <div className="text-[14px] text-[#2874f0] cursor-pointer font-medium">
              See more product details
            </div>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="w-full bg-white max-w-[600px] mx-auto px-4 py-6 mt-2">
        <h6 className="text-[20px] font-medium text-[#212121] mb-8">Ratings & Reviews</h6>
        
        <div className="flex items-center gap-8 mb-8">
          <div className="flex flex-col items-center justify-center w-24">
            <div className="flex items-center justify-center gap-1 text-[36px] font-normal text-[#212121] leading-none mb-2">
              4.1 <span className="text-[28px] mt-1">★</span>
            </div>
            <div className="text-[13px] text-[#878787] text-center leading-snug">
              30,676<br/>Ratings &<br/>1,847<br/>Reviews
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-[7px] text-[12px] text-[#878787]">
            {[
              { star: 5, w: "w-[85%]", color: "bg-[#388e3c]", c: "16,549" },
              { star: 4, w: "w-[40%]", color: "bg-[#388e3c]", c: "6,808" },
              { star: 3, w: "w-[25%]", color: "bg-[#388e3c]", c: "3,619" },
              { star: 2, w: "w-[10%]", color: "bg-[#ff9f00]", c: "1,594" },
              { star: 1, w: "w-[15%]", color: "bg-[#ff6161]", c: "2,106" },
            ].map(r => (
              <div key={r.star} className="flex items-center gap-2">
                <span className="w-[20px] text-right text-[#212121] font-bold">{r.star} ★</span>
                <div className="flex-1 h-[5px] bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full ${r.w}`}></div>
                </div>
                <span className="w-12 text-right">{r.c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-4 border-t border-gray-100 pt-2">
          {/* Static Dummy Review 1 */}
          <div className="py-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#388e3c] text-white px-1.5 py-[2px] rounded-[2px] flex items-center gap-1 text-[11px] font-bold">
                4 ★
              </div>
              <span className="text-[13px] font-bold text-[#212121]">Very Good</span>
            </div>
            <p className="text-[13px] text-[#212121] mb-2.5">Quality maintained 👍be sure to purchase</p>
            <div className="flex items-center gap-[6px] text-[11px] text-[#878787]">
              <span>prajoth kprajoth</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#878787" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Certified Buyer, Kozhikode</span>
              <span className="ml-1 text-[10px]">16 days ago</span>
            </div>
          </div>
          
          {/* Static Dummy Review 2 */}
          <div className="py-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#388e3c] text-white px-1.5 py-[2px] rounded-[2px] flex items-center gap-1 text-[11px] font-bold">
                5 ★
              </div>
              <span className="text-[13px] font-bold text-[#212121]">Awesome</span>
            </div>
            <p className="text-[13px] text-[#212121] mb-2.5">Good quality</p>
            <div className="flex items-center gap-[6px] text-[11px] text-[#878787]">
              <span>Flipkart Customer</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#878787" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Certified Buyer, Navi Mumbai</span>
              <span className="ml-1 text-[10px]">16 days ago</span>
            </div>
          </div>

          {/* Static Dummy Review 3 */}
          <div className="py-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#388e3c] text-white px-1.5 py-[2px] rounded-[2px] flex items-center gap-1 text-[11px] font-bold">
                5 ★
              </div>
              <span className="text-[13px] font-bold text-[#212121]">Great product</span>
            </div>
            <p className="text-[13px] text-[#212121] mb-2.5">Good</p>
            <div className="flex items-center gap-[6px] text-[11px] text-[#878787]">
              <span>Flipkart Customer</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#878787" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Certified Buyer, Howrah</span>
              <span className="ml-1 text-[10px]">6 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={handleAddToCart} className="flex-1 bg-white text-[#212121] py-3.5 font-bold text-[16px] border-r border-gray-200 flex items-center justify-center">
          Add to Cart
        </button>
        <button onClick={handleBuyNow} className="flex-1 bg-[#ffc200] text-[#212121] py-3.5 font-bold text-[16px] flex items-center justify-center">
          Buy Now
        </button>
      </div>
  
    </div>
  );
}

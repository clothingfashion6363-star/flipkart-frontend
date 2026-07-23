"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// Removed static imports

const AppContext = globalThis.AppContext || createContext({
  activeTab: "home",
  wishlist: new Set(),
  products: [],
  categories: [],
  banners: [],
  settings: null,
  cart: [],
  isCartOpen: false,
  filters: {},
  searchQuery: "",
  filteredProducts: [],
  isMobileFilterOpen: false,
  isMobileSortOpen: false,
  cartTotal: 0,
  cartOriginalTotal: 0,
  loading: false,
});

if (process.env.NODE_ENV !== "production") {
  globalThis.AppContext = AppContext;
}
export function AppProvider({ children, initialData }) {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and wishlist from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(new Set(JSON.parse(savedWishlist)));
      }
    } catch (error) {
      console.error("Error loading state from local storage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to local storage:", error);
      }
    }
  }, [cart, isLoaded]);

  // Save wishlist to local storage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("wishlist", JSON.stringify(Array.from(wishlist)));
      } catch (error) {
        console.error("Error saving wishlist to local storage:", error);
      }
    }
  }, [wishlist, isLoaded]);

  // Data state initialized from server
  const [products, setProducts] = useState(initialData?.products || []);
  const [categories, setCategories] = useState(initialData?.categories || []);
  const [banners, setBanners] = useState(initialData?.banners || []);
  
  // Use codAdvanceAmount and Pixels from schema, with fallback to legacy offers hack
  let initialSettings = initialData?.settings || null;
  if (initialSettings) {
    let codAdvanceAmount = initialSettings.codAdvanceAmount || 0;
    let metaPixelId = initialSettings.metaPixelId || '';
    let googleAnalyticsId = initialSettings.googleAnalyticsId || '';
    
    if (initialSettings.offers) {
      const advanceOffer = initialSettings.offers.find(o => o && o.startsWith && o.startsWith('COD_ADVANCE:'));
      if (advanceOffer && codAdvanceAmount === 0) {
        codAdvanceAmount = Number(advanceOffer.split(':')[1]) || 0;
      }
      
      const metaOffer = initialSettings.offers.find(o => o && o.startsWith && o.startsWith('PIXEL_META:'));
      if (metaOffer && !metaPixelId) {
        metaPixelId = metaOffer.split(':')[1] || '';
      }
      
      const gaOffer = initialSettings.offers.find(o => o && o.startsWith && o.startsWith('PIXEL_GA:'));
      if (gaOffer && !googleAnalyticsId) {
        googleAnalyticsId = gaOffer.split(':')[1] || '';
      }
    }
    
    initialSettings.codAdvanceAmount = codAdvanceAmount;
    initialSettings.metaPixelId = metaPixelId;
    initialSettings.googleAnalyticsId = googleAnalyticsId;
  }
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false); // No loading state needed now

  // Filters state
  const [filters, setFilters] = useState({
    category: null,
    priceRange: null, // { min, max }
    minRating: null,
    sortBy: "relevance",
  });

  // Derived state
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products and settings on client-side so it appears in the network tab and is never stale
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        
        // Fetch products (get all of them instead of default 40)
        const productsRes = await fetch(`${apiUrl}/products?limit=1000`, { cache: "no-store" });
        if (productsRes.ok) {
          const data = await productsRes.json();
          setProducts(data.data || data || []);
        }

        // Fetch latest settings
        const settingsRes = await fetch(`${apiUrl}/settings`);
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          if (data.data) {
            setSettings(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data on client:", error);
      }
    };
    fetchData();
  }, []);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          (typeof p.category === 'string' && p.category.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((p) => {
        // Handle both string category and populated object
        if (typeof p.category === 'object' && p.category?._id) {
          return p.category._id === filters.category;
        }
        return p.category === filters.category;
      });
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );
    }

    // Rating filter
    if (filters.minRating) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount-desc":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "new":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // "relevance" - no sorting needed
        break;
    }

    setFilteredProducts(result);
  }, [filters, searchQuery, products]);

  // Actions
  const addToCart = (product, size = "Standard", qty = 1, openDrawer = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => (item.id || item._id) === (product.id || product._id) && item.size === size);
      if (existing) {
        return prev.map((item) =>
          (item.id || item._id) === (product.id || product._id) && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, size, qty }];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateCartQty = (productId, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.id || item._id) === productId && item.size === size
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((item) => !((item.id || item._id) === productId && item.size === size)));
  };

  const calculateTotals = () => {
    let subTotal = 0;
    let originalTotal = 0;
    let items = [];

    cart.forEach(item => {
      for (let i = 0; i < item.qty; i++) {
        items.push(item);
      }
      originalTotal += (item.originalPrice || item.price + 100) * item.qty;
      subTotal += item.price * item.qty;
    });

    let discountFromOffers = 0;

    if (settings?.offers && settings.offers.length > 0) {
      let maxDiscount = 0;
      settings.offers.forEach(offer => {
        const match = offer.toLowerCase().match(/^b(\d+)g(\d+)$/);
        if (match) {
          const buy = parseInt(match[1], 10);
          const get = parseInt(match[2], 10);
          const required = buy + get;
          
          if (items.length >= required) {
             const applicableSets = Math.floor(items.length / required);
             const freeCount = applicableSets * get;
             
             const sortedItems = [...items].sort((a, b) => a.price - b.price);
             let currentDiscount = 0;
             for (let i = 0; i < freeCount; i++) {
               currentDiscount += sortedItems[i].price;
             }
             if (currentDiscount > maxDiscount) {
               maxDiscount = currentDiscount;
             }
          }
        }
      });
      discountFromOffers = maxDiscount;
    }

    return {
      cartTotal: subTotal - discountFromOffers,
      cartOriginalTotal: originalTotal,
      offerDiscount: discountFromOffers,
      cartSubTotal: subTotal
    };
  };

  const { cartTotal, cartOriginalTotal, offerDiscount, cartSubTotal } = calculateTotals();

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const setCategoryFilter = (categoryId) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  const handleTabChange = (tab, category = null) => {
    setActiveTab(tab);
    if (category) {
      setCategoryFilter(category);
    } else if (tab === "home") {
      setCategoryFilter(null);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        handleTabChange,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotal,
        cartOriginalTotal,
        cartSubTotal,
        offerDiscount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        setCategoryFilter,
        filteredProducts,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        isMobileSortOpen,
        setIsMobileSortOpen,
        products,
        categories,
        banners,
        settings,
        loading,
        isLoaded,
      }}
    >
      {settings && (
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-meesho-purple: ${settings.primaryColor};
              --color-meesho-pink: ${settings.accentColor};
            }
          `
        }} />
      )}
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

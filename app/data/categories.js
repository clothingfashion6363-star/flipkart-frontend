export const categories = [
  {
    id: "women",
    name: "Women Ethnic",
    icon: "👗",
    image: "https://images.meesho.com/images/marketing/1629907233588_512.webp",
    subcategories: [
      { id: "sarees", name: "Sarees", image: "https://images.meesho.com/images/marketing/1629907233588_512.webp" },
      { id: "kurtis", name: "Kurtis", image: "https://images.meesho.com/images/marketing/1629907282498_512.webp" },
      { id: "dresses", name: "Dresses", image: "https://images.meesho.com/images/marketing/1629907322498_512.webp" },
      { id: "leggings", name: "Leggings", image: "https://images.meesho.com/images/marketing/1629907362498_512.webp" },
      { id: "palazzos", name: "Palazzos", image: "https://images.meesho.com/images/marketing/1629907402498_512.webp" },
      { id: "dupatta", name: "Dupatta", image: "https://images.meesho.com/images/marketing/1629907442498_512.webp" },
    ],
  },
  {
    id: "men",
    name: "Men",
    icon: "👔",
    image: "https://images.meesho.com/images/marketing/1629907282498_512.webp",
    subcategories: [
      { id: "shirts", name: "Shirts", image: "https://images.meesho.com/images/marketing/1629907282498_512.webp" },
      { id: "tshirts", name: "T-Shirts", image: "https://images.meesho.com/images/marketing/1629907322498_512.webp" },
      { id: "jeans", name: "Jeans", image: "https://images.meesho.com/images/marketing/1629907362498_512.webp" },
      { id: "trousers", name: "Trousers", image: "https://images.meesho.com/images/marketing/1629907402498_512.webp" },
      { id: "track-pants", name: "Track Pants", image: "https://images.meesho.com/images/marketing/1629907442498_512.webp" },
      { id: "kurtas", name: "Kurtas", image: "https://images.meesho.com/images/marketing/1629907233588_512.webp" },
    ],
  },
  {
    id: "kids",
    name: "Kids",
    icon: "🧒",
    image: "https://images.meesho.com/images/marketing/1629907322498_512.webp",
    subcategories: [
      { id: "tshirts", name: "T-Shirts", image: "https://images.meesho.com/images/marketing/1629907322498_512.webp" },
      { id: "dresses", name: "Dresses", image: "https://images.meesho.com/images/marketing/1629907362498_512.webp" },
      { id: "sets", name: "Clothing Sets", image: "https://images.meesho.com/images/marketing/1629907402498_512.webp" },
    ],
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: "🏠",
    image: "https://images.meesho.com/images/marketing/1629907362498_512.webp",
    subcategories: [
      { id: "bedsheets", name: "Bedsheets", image: "https://images.meesho.com/images/marketing/1629907362498_512.webp" },
      { id: "kitchen", name: "Kitchen Items", image: "https://images.meesho.com/images/marketing/1629907402498_512.webp" },
      { id: "decor", name: "Home Decor", image: "https://images.meesho.com/images/marketing/1629907442498_512.webp" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "💍",
    image: "https://images.meesho.com/images/marketing/1629907402498_512.webp",
    subcategories: [
      { id: "earrings", name: "Earrings", image: "https://images.meesho.com/images/marketing/1629907402498_512.webp" },
      { id: "watches", name: "Watches", image: "https://images.meesho.com/images/marketing/1629907442498_512.webp" },
      { id: "handbags", name: "Handbags", image: "https://images.meesho.com/images/marketing/1629907233588_512.webp" },
      { id: "jewellery", name: "Jewellery", image: "https://images.meesho.com/images/marketing/1629907282498_512.webp" },
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    icon: "👟",
    image: "https://images.meesho.com/images/marketing/1629907442498_512.webp",
    subcategories: [
      { id: "sports-shoes", name: "Sports Shoes", image: "https://images.meesho.com/images/marketing/1629907442498_512.webp" },
      { id: "sandals", name: "Sandals", image: "https://images.meesho.com/images/marketing/1629907233588_512.webp" },
      { id: "heels", name: "Heels", image: "https://images.meesho.com/images/marketing/1629907282498_512.webp" },
    ],
  },
];

export const menuLinks = [
  { label: "Home", tab: "home" },
  { label: "Women Ethnic", tab: "home", category: "women" },
  { label: "Men", tab: "home", category: "men" },
  { label: "Kids", tab: "home", category: "kids" },
  { label: "Home & Kitchen", tab: "home", category: "home" },
  { label: "Accessories", tab: "home", category: "accessories" },
  { label: "Footwear", tab: "home", category: "footwear" },
  { label: "Meesho Mall", tab: "mall" },
];

export type Product = {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  image: string;
  category: string;
  stock: "in-stock" | "limited" | "out-of-stock";
  badge?: "trending" | "bestseller" | "limited";
  rating: number;
  reviews: number;
};

const MARKUP = 1.2;

export const getAdjustedPrice = (basePrice: number, markup = MARKUP) =>
  Math.round(basePrice * markup);

export const formatPrice = (price: number) =>
  `R ${price.toLocaleString("en-ZA")}`;

export const products: Product[] = [
  {
    id: "1",
    title: "Samsung Galaxy A15 128GB",
    description: "Experience the Samsung Galaxy A15 with its stunning 6.5-inch Super AMOLED display, powerful MediaTek Helio G99 processor, and impressive 50MP triple camera system. Perfect for everyday use with all-day battery life.",
    basePrice: 3499,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: "in-stock",
    badge: "bestseller",
    rating: 4.3,
    reviews: 1247,
  },
  {
    id: "2",
    title: "Nike Air Max 90 Sneakers",
    description: "Classic Nike Air Max 90 with visible Air cushioning, waffle outsole, and premium leather and textile upper. Timeless style meets modern comfort for everyday wear.",
    basePrice: 2199,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Fashion",
    stock: "in-stock",
    badge: "trending",
    rating: 4.6,
    reviews: 892,
  },
  {
    id: "3",
    title: "JBL Flip 6 Bluetooth Speaker",
    description: "Bold JBL Original Pro Sound with an optimized long excursion driver. 12 hours of playtime, IP67 waterproof and dustproof rating. PartyBoost enabled for pairing multiple speakers.",
    basePrice: 1899,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: "in-stock",
    rating: 4.5,
    reviews: 634,
  },
  {
    id: "4",
    title: "Instant Pot Duo 7-in-1 Pressure Cooker",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer. 6-quart capacity perfect for families. Stainless steel inner pot.",
    basePrice: 1599,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    stock: "limited",
    badge: "limited",
    rating: 4.7,
    reviews: 2103,
  },
  {
    id: "5",
    title: "Canon EOS M50 Mark II Camera",
    description: "24.1 Megapixel APS-C CMOS sensor, DIGIC 8 image processor, 4K UHD video recording. Perfect for content creators and photography enthusiasts with eye-detection autofocus.",
    basePrice: 12999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: "in-stock",
    badge: "trending",
    rating: 4.4,
    reviews: 456,
  },
  {
    id: "6",
    title: "Levi's 501 Original Fit Jeans",
    description: "The iconic straight fit with signature button fly. Made from premium denim with a classic five-pocket design. A wardrobe staple since 1873.",
    basePrice: 1299,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop",
    category: "Fashion",
    stock: "in-stock",
    rating: 4.2,
    reviews: 1567,
  },
  {
    id: "7",
    title: "Apple AirPods Pro 2nd Gen",
    description: "Active Noise Cancellation up to 2x more effective. Adaptive Transparency mode, personalized Spatial Audio with dynamic head tracking. MagSafe charging case.",
    basePrice: 4999,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: "in-stock",
    badge: "bestseller",
    rating: 4.8,
    reviews: 3421,
  },
  {
    id: "8",
    title: "Dyson V12 Detect Slim Vacuum",
    description: "Laser Slim Fluffy cleaner head reveals microscopic dust. Piezo sensor automatically adjusts suction power. Up to 60 minutes runtime. LCD screen shows real-time data.",
    basePrice: 9499,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    stock: "out-of-stock",
    rating: 4.6,
    reviews: 287,
  },
  {
    id: "9",
    title: "The North Face Borealis Backpack",
    description: "28L capacity with FlexVent suspension system for comfort. Dedicated laptop compartment fits up to 15-inch laptop. Water-resistant finish and reflective details.",
    basePrice: 1899,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Fashion",
    stock: "in-stock",
    rating: 4.5,
    reviews: 743,
  },
  {
    id: "10",
    title: "PlayStation 5 DualSense Controller",
    description: "Haptic feedback and adaptive triggers for immersive gaming. Built-in microphone and headset jack. Rechargeable battery with USB-C charging.",
    basePrice: 1399,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    category: "Gaming",
    stock: "limited",
    badge: "trending",
    rating: 4.7,
    reviews: 1876,
  },
  {
    id: "11",
    title: "Olay Regenerist Micro-Sculpting Cream",
    description: "Advanced anti-aging moisturizer with hyaluronic acid, amino-peptides, and vitamin B3. Hydrates for 24 hours and visibly reduces wrinkles.",
    basePrice: 499,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    category: "Beauty",
    stock: "in-stock",
    rating: 4.3,
    reviews: 2890,
  },
  {
    id: "12",
    title: "Xiaomi Smart Band 8",
    description: "1.62-inch AMOLED display with 60Hz refresh rate. 150+ sports modes, blood oxygen monitoring, and up to 16 days battery life. 5ATM water resistance.",
    basePrice: 899,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    category: "Electronics",
    stock: "in-stock",
    badge: "bestseller",
    rating: 4.4,
    reviews: 1234,
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

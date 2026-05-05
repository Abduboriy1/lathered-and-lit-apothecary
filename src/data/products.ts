import type { Product } from "@/types";

const img = "/src/assets/LatheredAndLit.png";

export const products: Product[] = [
  {
    id: "velvet-rose-amber",
    name: "Velvet Rose & Amber",
    price: 32,
    category: "candle",
    scent: ["Rose", "Amber", "Sandalwood", "Musk"],
    description:
      "A warm, romantic blend of fresh-cut rose petals layered over golden amber and creamy sandalwood. Burns clean with a soft, lingering warmth that fills any room.",
    shortDescription: "Warm rose, amber & sandalwood glow",
    imageUrl: img,
    burnTime: "45–50 hrs",
    weight: "8 oz",
    featured: true,
    stock: 24,
    badges: ["bestseller"],
  },
  {
    id: "sea-salt-driftwood",
    name: "Sea Salt & Driftwood",
    price: 28,
    category: "candle",
    scent: ["Sea Salt", "Driftwood", "Coastal Air", "White Musk"],
    description:
      "Breathe in cool ocean breezes and sun-bleached driftwood. This clean, airy scent brings the calm of a shoreline morning into your home.",
    shortDescription: "Clean coastal air & driftwood",
    imageUrl: img,
    burnTime: "40–45 hrs",
    weight: "8 oz",
    featured: true,
    stock: 18,
    badges: ["new"],
  },
  {
    id: "champagne-toast",
    name: "Champagne Toast",
    price: 36,
    category: "candle",
    scent: ["Effervescent Citrus", "Golden Pear", "Vanilla", "Champagne"],
    description:
      "Celebrate every moment. Sparkling citrus and golden pear dance over a creamy vanilla base — the scent of pure celebration in a glass jar.",
    shortDescription: "Sparkling citrus, pear & vanilla",
    imageUrl: img,
    burnTime: "45–50 hrs",
    weight: "8 oz",
    featured: true,
    stock: 12,
    badges: ["limited"],
  },
  {
    id: "vanilla-cashmere",
    name: "Vanilla Cashmere",
    price: 30,
    category: "candle",
    scent: ["Madagascar Vanilla", "Cashmere", "Warm Woods", "Tonka Bean"],
    description:
      "Wrapped in softness. Rich Madagascar vanilla melts into silky cashmere and warm tonka bean for the ultimate cozy, comforting burn.",
    shortDescription: "Rich vanilla, cashmere & tonka",
    imageUrl: img,
    burnTime: "40–45 hrs",
    weight: "8 oz",
    featured: true,
    stock: 30,
    badges: ["bestseller"],
  },
  {
    id: "frosted-peony",
    name: "Frosted Peony",
    price: 32,
    category: "candle",
    scent: ["Peony", "White Tea", "Sheer Musk", "Lily"],
    description:
      "Delicate and dreamy. Fresh-cut peony blossoms with cool white tea and a whisper of lily — a floral so soft it feels like morning light.",
    shortDescription: "Soft peony, white tea & lily",
    imageUrl: img,
    burnTime: "45–50 hrs",
    weight: "8 oz",
    featured: false,
    stock: 20,
  },
  {
    id: "black-fig-honey",
    name: "Black Fig & Honey",
    price: 34,
    category: "candle",
    scent: ["Black Fig", "Raw Honey", "Amber", "Cedar"],
    description:
      "Deep and intoxicating. Ripe black figs drizzled in raw honey over a base of warm amber and cedar — sophisticated, moody, unforgettable.",
    shortDescription: "Dark fig, honey & warm cedar",
    imageUrl: img,
    burnTime: "45–50 hrs",
    weight: "8 oz",
    featured: false,
    stock: 15,
  },
  {
    id: "milk-honey-bar",
    name: "Milk & Honey Bar",
    price: 14,
    category: "soap",
    scent: ["Raw Honey", "Oat Milk", "Vanilla", "Chamomile"],
    description:
      "Gentle enough for daily use. Cold-process soap with real oat milk and raw honey that nourishes and softens. Lathers into a dreamy, creamy foam.",
    shortDescription: "Nourishing oat milk & honey",
    imageUrl: img,
    weight: "4 oz",
    featured: false,
    stock: 40,
    badges: ["bestseller"],
  },
  {
    id: "rose-quartz-bar",
    name: "Rose Quartz Bar",
    price: 16,
    category: "soap",
    scent: ["Bulgarian Rose", "Peach", "Jasmine", "Soft Musk"],
    description:
      "Infused with rose clay and Bulgarian rose essential oil. This blush-pink beauty bar exfoliates gently while wrapping your skin in pure floral luxury.",
    shortDescription: "Rose clay, Bulgarian rose & jasmine",
    imageUrl: img,
    weight: "4 oz",
    featured: false,
    stock: 35,
    badges: ["new"],
  },
  {
    id: "ritual-set",
    name: "The Ritual Set",
    price: 58,
    category: "set",
    scent: ["Velvet Rose", "Vanilla Cashmere", "Rose Quartz"],
    description:
      "Everything you need for a perfect self-care ritual. Includes one Velvet Rose & Amber candle, one Vanilla Cashmere candle, and the Rose Quartz Bar — beautifully gift-boxed.",
    shortDescription: "Two candles + bar soap, gift-boxed",
    imageUrl: img,
    weight: "20 oz",
    featured: false,
    stock: 10,
    badges: ["bestseller"],
  },
  {
    id: "golden-hour-collection",
    name: "Golden Hour Collection",
    price: 68,
    category: "set",
    scent: ["Champagne Toast", "Black Fig & Honey", "Milk & Honey"],
    description:
      "A curated trio of our most indulgent scents, wrapped in gold tissue and a keepsake box. The perfect gift for someone who deserves the golden hour — every day.",
    shortDescription: "Three scents in a keepsake gift box",
    imageUrl: img,
    weight: "24 oz",
    featured: false,
    stock: 8,
    badges: ["limited"],
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

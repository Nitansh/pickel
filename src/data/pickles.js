export const BASE_PRICE_250G = 200;
export const DAYS_PER_RUPEE = 4;

// Initial reference date: August 3, 2026
export const INITIAL_REFERENCE_DATE_MS = new Date('2026-08-03T00:00:00+05:30').getTime();

export function getDynamicallyAgedDays(initialAgedDays) {
  const nowMs = Date.now();
  const diffMs = nowMs - INITIAL_REFERENCE_DATE_MS;
  const elapsedDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return (initialAgedDays || 0) + elapsedDays;
}

export function calculateAgeSurchargePerKg(agedDays) {
  return Math.floor((agedDays || 0) / DAYS_PER_RUPEE);
}

export function getProductSizes(product) {
  const currentAge = getDynamicallyAgedDays(product.initialAgedDays || product.agedDays);
  const ageSurchargePerKg = calculateAgeSurchargePerKg(currentAge);
  return [
    { 
      weight: '250g', 
      weightKg: 0.25, 
      basePrice: 200,
      ageSurcharge: Math.round(ageSurchargePerKg * 0.25),
      price: 200 + Math.round(ageSurchargePerKg * 0.25) 
    },
    { 
      weight: '500g', 
      weightKg: 0.5, 
      basePrice: 400,
      ageSurcharge: Math.round(ageSurchargePerKg * 0.5),
      price: 400 + Math.round(ageSurchargePerKg * 0.5) 
    },
    { 
      weight: '1kg', 
      weightKg: 1.0, 
      basePrice: 800,
      ageSurcharge: ageSurchargePerKg,
      price: 800 + ageSurchargePerKg 
    }
  ];
}

export function getProductPrice(product, sizeWeight = '250g') {
  const sizes = getProductSizes(product);
  const found = sizes.find(s => s.weight === sizeWeight);
  return found ? found.price : sizes[0].price;
}

export const PICKLE_CATEGORIES = [
  { id: 'all', name: 'All Signature Pickles', icon: '✨' },
  { id: 'mango', name: 'Mango', icon: '🥭' },
  { id: 'lemon', name: 'Sweet Lemon', icon: '🍋' },
  { id: 'greenchili', name: 'Green Chili', icon: '🌶️' },
  { id: 'redchili', name: 'Red Chili', icon: '🔥' }
];

export const PICKLE_PRODUCTS = [
  {
    id: 'mango-avakaya',
    name: 'Grandma’s Avakaya Raw Mango',
    subtitle: 'Classic Sun-Dried Raw Mango Pickle in Cold-Pressed Mustard Oil',
    category: 'mango',
    basePrice250g: BASE_PRICE_250G,
    initialAgedDays: 48, // Initial age on Aug 3, 2026
    get agedDays() {
      return getDynamicallyAgedDays(this.initialAgedDays);
    },
    stockKg: 25, // 25kg batch available
    rating: 4.9,
    reviewCount: 428,
    spiceLevel: 4,
    spiceLabel: 'Fiery Hot',
    tag: 'Best Seller 🥭',
    oilType: 'Cold-Pressed Mustard Oil',
    dietary: ['100% Organic', 'Vegan', 'Preservative Free'],
    description: 'Crisp raw Andhra mangoes cut into chunks, marinated in crushed Guntur red chilies, mustard seeds, fenugreek, and cold-pressed mustard oil.',
    ingredients: ['Raw Andhra Mangoes', 'Cold-Pressed Mustard Oil', 'Guntur Red Chili Powder', 'Yellow Mustard Seeds', 'Fenugreek Powder', 'Himalayan Pink Salt', 'Asafoetida (Hing)'],
    get sizes() {
      return getProductSizes(this);
    },
    imageBg: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #d97706 100%)',
    emoji: '🥭🌶️',
    inStock: true
  },
  {
    id: 'sweet-lemon',
    name: 'Vintage 2-Year Aged Sweet Lemon',
    subtitle: 'Slowly Matured for 2 Full Years (730 Days) in Sun-Warmed Terracotta',
    category: 'lemon',
    basePrice250g: BASE_PRICE_250G,
    initialAgedDays: 730, // Initial age on Aug 3, 2026
    get agedDays() {
      return getDynamicallyAgedDays(this.initialAgedDays);
    },
    stockKg: 10, // 10kg batch available
    rating: 4.9,
    reviewCount: 312,
    spiceLevel: 1,
    spiceLabel: 'Sweet & Mild',
    tag: 'Aged 2 Years 🍋',
    oilType: 'Oil-Free Jaggery Brine',
    dietary: ['Zero Oil', 'Aged 2 Years', 'Digestive Goodness'],
    description: 'Juicy Kagzi lemons aged under the warm sun. The peel gets dark, soft, and rich in organic jaggery, black salt, cardamom, and carom seeds. Tastes extraordinarily rich with age.',
    ingredients: ['2-Year Sun-Aged Kagzi Lemons', 'Organic Sugarcane Jaggery', 'Pink Rock Salt', 'Black Salt', 'Cardamom Powder', 'Roasted Cumin', 'Carom Seeds (Ajwain)'],
    get sizes() {
      return getProductSizes(this);
    },
    imageBg: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)',
    emoji: '🍋🍯',
    inStock: true
  },
  {
    id: 'green-chili',
    name: 'Fiery Green Chili & Mustard',
    subtitle: 'Split Fresh Green Chilies Marinated in Mustard Oil',
    category: 'greenchili',
    basePrice250g: BASE_PRICE_250G,
    initialAgedDays: 40, // Initial age on Aug 3, 2026
    get agedDays() {
      return getDynamicallyAgedDays(this.initialAgedDays);
    },
    stockKg: 10, // 10kg batch available
    rating: 4.9,
    reviewCount: 285,
    spiceLevel: 4,
    spiceLabel: 'Fiery Hot',
    tag: 'Spicy Favorite 🌶️',
    oilType: 'Cold-Pressed Mustard Oil',
    dietary: ['100% Natural', 'Gluten Free', 'Vegan'],
    description: 'Fresh farm-picked green chilies slit vertically and stuffed with coarse yellow mustard seeds, crushed fennel, turmeric, and cold-pressed Kachi Ghani mustard oil.',
    ingredients: ['Farm-Fresh Green Chilies', 'Yellow Mustard Seeds', 'Kachi Ghani Mustard Oil', 'Fennel Powder (Saunf)', 'Dry Mango Powder (Amchur)', 'Turmeric', 'Pink Salt'],
    get sizes() {
      return getProductSizes(this);
    },
    imageBg: 'linear-gradient(135deg, #14532d 0%, #15803d 50%, #84cc16 100%)',
    emoji: '🌶️✨',
    inStock: true
  },
  {
    id: 'red-chili',
    name: 'Stuffed Benarasi Red Chili',
    subtitle: 'Whole Plump Red Peppers Stuffed with 12 Heritage Spices',
    category: 'redchili',
    basePrice250g: BASE_PRICE_250G,
    initialAgedDays: 60, // Initial age on Aug 3, 2026
    get agedDays() {
      return getDynamicallyAgedDays(this.initialAgedDays);
    },
    stockKg: 10, // 10kg batch available
    rating: 5.0,
    reviewCount: 390,
    spiceLevel: 5,
    spiceLabel: 'Royal Heat 🔥',
    tag: 'Royal Heritage 👑',
    oilType: 'Pure Mustard Oil',
    dietary: ['Handcrafted', 'Heritage Recipe', 'No Water Added'],
    description: 'Thick, vibrant Banarasi red chilies hand-stuffed with a fragrant 12-spice mixture including dry mango powder, fennel, mustard, and aged mustard oil.',
    ingredients: ['Banarasi Thick Red Chilies', 'Amchur (Dry Mango Powder)', 'Saunf (Fennel)', 'Ajwain', 'Mustard Powder', 'Mustard Oil', 'Rock Salt', 'Hing'],
    get sizes() {
      return getProductSizes(this);
    },
    imageBg: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)',
    emoji: '🌶️👑',
    inStock: true
  }
];





export const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'The Signature Box',
    frequency: 'Monthly Box',
    price: 799,
    originalPrice: 999,
    savings: 'Save 20%',
    features: ['3 Pickles Box (Raw Mango, Sweet Lemon, Red Chili)', 'Free Express Doorstep Shipping', 'Cancel or Pause Anytime']
  },
  {
    id: 'quarterly',
    name: 'The Heritage Pantry',
    frequency: 'Quarterly Box (3 Months)',
    price: 2199,
    originalPrice: 2999,
    savings: 'Save 27%',
    popular: true,
    features: ['9 Jars over 3 Months (All 4 Signature Varieties)', '1 Free Custom Engraved Ceramic Jar', 'Priority Free Shipping']
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Radhika Sharma',
    city: 'Mumbai',
    rating: 5,
    comment: 'The Grandma Avakaya Raw Mango pickle tastes exactly like home! The oil fragrance and spice level are 10/10.',
    product: 'Grandma’s Avakaya Raw Mango',
    verified: true,
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'Vikramaditya Verma',
    city: 'Bengaluru',
    rating: 5,
    comment: 'Sweet Lemon Pickle is amazing with parathas! Perfectly balanced sweet and tangy flavor.',
    product: 'Sweet & Tangy Lemon Delight',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Ananya Roy',
    city: 'Kolkata',
    rating: 5,
    comment: 'Stuffed Benarasi Red Chili pickle is royal! Thick red chilies with rich mustard oil.',
    product: 'Stuffed Benarasi Red Chili',
    verified: true,
    date: '3 days ago'
  }
];

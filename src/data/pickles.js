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
    price: 349,
    rating: 4.9,
    reviewCount: 428,
    spiceLevel: 4,
    spiceLabel: 'Fiery Hot',
    agedDays: 45,
    tag: 'Best Seller 🥭',
    oilType: 'Cold-Pressed Mustard Oil',
    dietary: ['100% Organic', 'Vegan', 'Preservative Free'],
    description: 'Crisp raw Andhra mangoes cut into chunks, marinated in crushed Guntur red chilies, mustard seeds, fenugreek, and cold-pressed mustard oil. Sun-cured for 45 days.',
    ingredients: ['Raw Andhra Mangoes', 'Cold-Pressed Mustard Oil', 'Guntur Red Chili Powder', 'Yellow Mustard Seeds', 'Fenugreek Powder', 'Himalayan Pink Salt', 'Asafoetida (Hing)'],
    sizes: [
      { weight: '250g', price: 349 },
      { weight: '500g', price: 629 },
      { weight: '1kg', price: 1149 }
    ],
    imageBg: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #d97706 100%)',
    emoji: '🥭🌶️',
    inStock: true
  },
  {
    id: 'sweet-lemon',
    name: 'Sweet & Tangy Lemon Delight',
    subtitle: 'Sun-Matured Kagzi Lemons with Organic Jaggery & Spices',
    category: 'lemon',
    price: 299,
    rating: 4.8,
    reviewCount: 312,
    spiceLevel: 1,
    spiceLabel: 'Sweet & Mild',
    agedDays: 60,
    tag: 'Oil Free 🍋',
    oilType: 'Oil-Free Jaggery Brine',
    dietary: ['Zero Oil', 'Organic Jaggery', 'Digestive Goodness'],
    description: 'Juicy Kagzi lemon slices slow sun-cooked with pure sugarcane jaggery, black salt, cardamom, and roasted cumin. Sweet, tangy, and soothing for digestion.',
    ingredients: ['Fresh Kagzi Lemons', 'Organic Sugarcane Jaggery', 'Pink Rock Salt', 'Black Salt', 'Cardamom Powder', 'Roasted Cumin', 'Carom Seeds (Ajwain)'],
    sizes: [
      { weight: '250g', price: 299 },
      { weight: '500g', price: 549 },
      { weight: '1kg', price: 999 }
    ],
    imageBg: 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #fef08a 100%)',
    emoji: '🍋🍯',
    inStock: true
  },
  {
    id: 'green-chili',
    name: 'Fiery Green Chili & Mustard',
    subtitle: 'Split Fresh Green Chilies Marinated in Mustard Oil',
    category: 'greenchili',
    price: 279,
    rating: 4.9,
    reviewCount: 285,
    spiceLevel: 4,
    spiceLabel: 'Fiery Hot',
    agedDays: 30,
    tag: 'Spicy Favorite 🌶️',
    oilType: 'Cold-Pressed Mustard Oil',
    dietary: ['100% Natural', 'Gluten Free', 'Vegan'],
    description: 'Fresh farm-picked green chilies slit vertically and stuffed with coarse yellow mustard seeds, crushed fennel, turmeric, and cold-pressed Kachi Ghani mustard oil.',
    ingredients: ['Farm-Fresh Green Chilies', 'Yellow Mustard Seeds', 'Kachi Ghani Mustard Oil', 'Fennel Powder (Saunf)', 'Dry Mango Powder (Amchur)', 'Turmeric', 'Pink Salt'],
    sizes: [
      { weight: '250g', price: 279 },
      { weight: '500g', price: 499 },
      { weight: '1kg', price: 899 }
    ],
    imageBg: 'linear-gradient(135deg, #14532d 0%, #15803d 50%, #84cc16 100%)',
    emoji: '🌶️✨',
    inStock: true
  },
  {
    id: 'red-chili',
    name: 'Stuffed Benarasi Red Chili',
    subtitle: 'Whole Plump Red Peppers Stuffed with 12 Heritage Spices',
    category: 'redchili',
    price: 389,
    rating: 5.0,
    reviewCount: 390,
    spiceLevel: 5,
    spiceLabel: 'Royal Heat 🔥',
    agedDays: 50,
    tag: 'Royal Heritage 👑',
    oilType: 'Pure Mustard Oil',
    dietary: ['Handcrafted', 'Heritage Recipe', 'No Water Added'],
    description: 'Thick, vibrant Benarasi red chilies hand-stuffed with a fragrant 12-spice mixture including dry mango powder, fennel, mustard, and aged mustard oil.',
    ingredients: ['Banarasi Thick Red Chilies', 'Amchur (Dry Mango Powder)', 'Saunf (Fennel)', 'Ajwain', 'Mustard Powder', 'Mustard Oil', 'Rock Salt', 'Hing'],
    sizes: [
      { weight: '250g', price: 389 },
      { weight: '500g', price: 699 },
      { weight: '1kg', price: 1249 }
    ],
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

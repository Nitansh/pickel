export const PICKLE_CATEGORIES = [
  { id: 'all', name: 'All Pickles', icon: '✨' },
  { id: 'indian', name: 'Traditional Indian', icon: '🥭' },
  { id: 'fiery', name: 'Fiery & Oil Infused', icon: '🌶️' },
  { id: 'global', name: 'Global Ferments', icon: '🌏' },
  { id: 'sweet', name: 'Sweet & Tangy', icon: '🍯' }
];

export const PICKLE_PRODUCTS = [
  {
    id: 'p1',
    name: 'Grandma’s Avakaya Raw Mango',
    subtitle: 'Classic Guntur-Style Sun-Dried Mango Pickle',
    category: 'indian',
    price: 349,
    rating: 4.9,
    reviewCount: 428,
    spiceLevel: 4,
    spiceLabel: 'Fiery Hot',
    agedDays: 45,
    tag: 'Best Seller 🔥',
    oilType: 'Cold-Pressed Mustard Oil',
    dietary: ['100% Organic', 'Vegan', 'Preservative Free'],
    description: 'Crisp raw raw mango cut into chunks, marinated in crushed Guntur red chilies, mustard seeds, fenugreek, and cold-pressed mustard oil. Matured under the sun for 45 days.',
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
    id: 'p2',
    name: 'Desi Whole Garlic & Nigella',
    subtitle: 'Slow-Cooked Garlic Cloves in Mustard Oil',
    category: 'indian',
    price: 299,
    rating: 4.8,
    reviewCount: 312,
    spiceLevel: 3,
    spiceLabel: 'Medium Hot',
    agedDays: 30,
    tag: 'Immunity Booster 🧄',
    oilType: 'Kachi Ghani Mustard Oil',
    dietary: ['Gluten Free', 'Zero Added Water'],
    description: 'Whole peeled plump garlic cloves slow-simmered in mustard oil with Kalonji (Nigella seeds), bishop seeds (Ajwain), and coarse red chilies.',
    ingredients: ['Farm-Fresh Whole Garlic', 'Mustard Oil', 'Nigella Seeds (Kalonji)', 'Bishop Seeds (Ajwain)', 'Dry Red Chilies', 'Turmeric', 'Pink Salt'],
    sizes: [
      { weight: '250g', price: 299 },
      { weight: '500g', price: 549 },
      { weight: '1kg', price: 999 }
    ],
    imageBg: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)',
    emoji: '🧄✨',
    inStock: true
  },
  {
    id: 'p3',
    name: 'Bhut Jolokia Ghost Pepper Oil',
    subtitle: 'Assam Smoked Ghost Pepper Crisp',
    category: 'fiery',
    price: 499,
    rating: 5.0,
    reviewCount: 189,
    spiceLevel: 5,
    spiceLabel: 'Extreme Heat 🔥',
    agedDays: 60,
    tag: 'Extremely Hot ⚡',
    oilType: 'Infused Sesame & Chili Oil',
    dietary: ['Keto Friendly', 'Artisanal Batch'],
    description: 'Handpicked Assam Ghost Peppers smoked over wood logs and infused in slow-toasted garlic sesame oil with crunchy shallot flakes. Proceed with caution!',
    ingredients: ['Assam Ghost Peppers (Bhut Jolokia)', 'Wood-Fired Sesame Oil', 'Fried Shallots', 'Garlic Flakes', 'Sichuan Pepper', 'Sea Salt'],
    sizes: [
      { weight: '150g', price: 499 },
      { weight: '300g', price: 899 }
    ],
    imageBg: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)',
    emoji: '🔥👻',
    inStock: true
  },
  {
    id: 'p4',
    name: 'Artisanal Sichuan Chili Crisp',
    subtitle: 'Crispy Garlic & Crunchy Peanut Oil Relish',
    category: 'fiery',
    price: 399,
    rating: 4.9,
    reviewCount: 520,
    spiceLevel: 3,
    spiceLabel: 'Medium Spicy',
    agedDays: 14,
    tag: 'Trending Worldwide 🥢',
    oilType: 'Toasted Peanut & Sesame Oil',
    dietary: ['Vegan', 'No MSG'],
    description: 'Crispy fried garlic chips, shallots, roasted peanuts, and numbing Sichuan peppercorns steeped in spicy chili oil. Adds umami magic to noodles, rice, and eggs.',
    ingredients: ['Sichuan Peppercorns', 'Crispy Garlic Chips', 'Roasted Peanuts', 'Chili Flakes', 'Toasted Sesame Seeds', 'Dark Soy Sauce Extract', 'Cold-Pressed Peanut Oil'],
    sizes: [
      { weight: '250g', price: 399 },
      { weight: '500g', price: 729 }
    ],
    imageBg: 'linear-gradient(135deg, #991b1b 0%, #d97706 50%, #f59e0b 100%)',
    emoji: '🌶️🥢',
    inStock: true
  },
  {
    id: 'p5',
    name: 'Traditional Napa Cabbage Kimchi',
    subtitle: 'Naturally Fermented Probiotic Korean Kimchi',
    category: 'global',
    price: 379,
    rating: 4.8,
    reviewCount: 275,
    spiceLevel: 2,
    spiceLabel: 'Mild-Medium',
    agedDays: 21,
    tag: 'Probiotic Goodness 🥬',
    oilType: 'Fermented Brine',
    dietary: ['100% Vegan Option', 'Gut Healthy', 'No Preservatives'],
    description: 'Salt-brined Napa cabbage leaves coated in Korean Gochugaru chili flakes, Asian pear juice, ginger, garlic, and spring onions. Wild fermented for gut wellness.',
    ingredients: ['Napa Cabbage', 'Korean Gochugaru Chili', 'Asian Pear', 'Daikon Radish', 'Fresh Ginger', 'Garlic', 'Sea Salt', 'Spring Onions'],
    sizes: [
      { weight: '350g', price: 379 },
      { weight: '700g', price: 699 }
    ],
    imageBg: 'linear-gradient(135deg, #14532d 0%, #15803d 50%, #84cc16 100%)',
    emoji: '🥬🌶️',
    inStock: true
  },
  {
    id: 'p6',
    name: 'Sweet Raw Mango Chunda',
    subtitle: 'Gujarati Sun-Cooked Sweet & Tangy Relish',
    category: 'sweet',
    price: 329,
    rating: 4.9,
    reviewCount: 390,
    spiceLevel: 1,
    spiceLabel: 'Mild & Sweet',
    agedDays: 40,
    tag: 'Kid Favorite 🍯',
    oilType: 'Oil-Free (Jaggery Based)',
    dietary: ['Fat Free', 'Made with Organic Jaggery'],
    description: 'Fine shredded Rajapuri raw mangoes slow sun-cooked with pure organic jaggery, saffron strands, cardamoms, and a hint of roasted cumin. Tastes heavenly with parathas.',
    ingredients: ['Shredded Raw Mango', 'Organic Sugarcane Jaggery', 'Saffron Strands', 'Cardamom Powder', 'Roasted Cumin', 'Cinnamon', 'Black Salt'],
    sizes: [
      { weight: '250g', price: 329 },
      { weight: '500g', price: 599 },
      { weight: '1kg', price: 1099 }
    ],
    imageBg: 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #fef08a 100%)',
    emoji: '🥭🍯',
    inStock: true
  },
  {
    id: 'p7',
    name: 'Stuffed Benarasi Red Chili',
    subtitle: 'Whole Red Peppers Stuffed with Roasted Spices',
    category: 'indian',
    price: 389,
    rating: 4.9,
    reviewCount: 210,
    spiceLevel: 4,
    spiceLabel: 'Fiery Hot',
    agedDays: 50,
    tag: 'Royal Recipe 👑',
    oilType: 'Mustard Oil',
    dietary: ['Handcrafted', 'Heritage Recipe'],
    description: 'Plump plump Benarasi red chilies carefully hand-stuffed with 12 roasted aromatic spices including dry mango powder (Amchur), mustard, and fennel.',
    ingredients: ['Banarasi Thick Red Chilies', 'Amchur (Dry Mango Powder)', 'Saunf (Fennel)', 'Ajwain', 'Mustard Powder', 'Mustard Oil', 'Rock Salt'],
    sizes: [
      { weight: '250g', price: 389 },
      { weight: '500g', price: 699 }
    ],
    imageBg: 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)',
    emoji: '🌶️👑',
    inStock: true
  },
  {
    id: 'p8',
    name: 'Tangy Lemon & Green Chili Brine',
    subtitle: 'Oil-Free Citrus Slices Matured in Rock Salt',
    category: 'indian',
    price: 249,
    rating: 4.7,
    reviewCount: 164,
    spiceLevel: 2,
    spiceLabel: 'Tangy Spice',
    agedDays: 60,
    tag: 'Oil Free 🍋',
    oilType: 'Oil-Free Natural Juice Brine',
    dietary: ['Zero Oil', 'Low Calorie', 'Digestive'],
    description: 'Thinly sliced Kagzi lemons and split green chilies marinated in pure lemon juice and pink rock salt with carom seeds. Gets smoother with age.',
    ingredients: ['Kagzi Fresh Lemons', 'Fresh Green Chilies', 'Lemon Juice', 'Pink Rock Salt', 'Ajwain Seeds', 'Black Pepper'],
    sizes: [
      { weight: '250g', price: 249 },
      { weight: '500g', price: 449 }
    ],
    imageBg: 'linear-gradient(135deg, #a16207 0%, #eab308 100%)',
    emoji: '🍋🌶️',
    inStock: true
  }
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'The Pickle Connoisseur',
    frequency: 'Monthly Box',
    price: 799,
    originalPrice: 999,
    savings: 'Save 20%',
    features: ['3 Surprise Artisanal Jars (250g each)', 'Exclusive Subscriber-only Seasonal Flavor', 'Free Express Doorstep Shipping', 'Cancel or Pause Anytime']
  },
  {
    id: 'quarterly',
    name: 'The Heritage Pantry',
    frequency: 'Quarterly Box (3 Months)',
    price: 2199,
    originalPrice: 2999,
    savings: 'Save 27%',
    popular: true,
    features: ['9 Jars over 3 Months (3 Jars / month)', '1 Free Custom Engraved Ceramic Jar', 'Priority Free Shipping', 'Custom Spice Level Selection']
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Radhika Sharma',
    city: 'Mumbai',
    rating: 5,
    comment: 'The Avakaya Raw Mango pickle tastes exactly like my grandmother used to make in Andhra! The oil fragrance and spice level are 10/10.',
    product: 'Grandma’s Avakaya Raw Mango',
    verified: true,
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'Vikramaditya Verma',
    city: 'Bengaluru',
    rating: 5,
    comment: 'Sichuan Chili Crisp is addictive! I put it on my fried eggs, Maggi, and even plain curd rice. Absolutely sublime texture.',
    product: 'Artisanal Sichuan Chili Crisp',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Ananya Roy',
    city: 'Kolkata',
    rating: 5,
    comment: 'Custom Pickle Jar builder was super fun! I created a Garlic + Bhut Jolokia mix in Mustard oil and it turned out insanely delicious.',
    product: 'Custom Build Jar',
    verified: true,
    date: '3 days ago'
  }
];

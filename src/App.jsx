import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import CustomPickleBuilder from './components/CustomPickleBuilder';
import SubscriptionSection from './components/SubscriptionSection';
import ReviewsFAQ from './components/ReviewsFAQ';
import Footer from './components/Footer';

import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      cartId: 'default-1',
      id: 'p1',
      name: 'Grandma’s Avakaya Raw Mango',
      price: 349,
      sizeWeight: '250g',
      quantity: 1,
      emoji: '🥭🌶️',
      imageBg: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #d97706 100%)'
    }
  ]);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Cart total item count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add standard product to cart
  const handleAddToCart = (product, sizeObj) => {
    const itemWeight = sizeObj ? sizeObj.weight : '250g';
    const itemPrice = sizeObj ? sizeObj.price : product.price;
    const cartId = `${product.id}-${itemWeight}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, {
          cartId,
          id: product.id,
          name: product.name,
          price: itemPrice,
          sizeWeight: itemWeight,
          quantity: 1,
          emoji: product.emoji,
          imageBg: product.imageBg
        }];
      }
    });

    setCartDrawerOpen(true);
  };

  // Add custom jar to cart
  const handleAddCustomJarToCart = (customProduct, sizeObj) => {
    const cartId = `custom-${Date.now()}`;
    setCartItems(prev => [...prev, {
      cartId,
      id: customProduct.id,
      name: customProduct.name,
      price: sizeObj.price,
      sizeWeight: sizeObj.weight,
      quantity: 1,
      emoji: customProduct.emoji,
      imageBg: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)'
    }]);

    setCartDrawerOpen(true);
  };

  // Subscribe plan action
  const handleSubscribePlan = (plan) => {
    const cartId = `sub-${plan.id}`;
    setCartItems(prev => [...prev, {
      cartId,
      id: plan.id,
      name: `${plan.name} (${plan.frequency})`,
      price: plan.price,
      sizeWeight: '3 Jars Box',
      quantity: 1,
      emoji: '📦🎁',
      imageBg: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
    }]);

    setCartDrawerOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQty = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
    } else {
      setCartItems(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity: newQty } : item));
    }
  };

  // Remove item from cart
  const handleRemoveItem = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Proceed to checkout modal
  const handleProceedCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  // Order complete callback
  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <Header 
        cartCount={cartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero Banner */}
      <Hero 
        onExploreClick={() => scrollToSection('catalog')}
        onCustomizerClick={() => scrollToSection('customizer')}
      />

      {/* Product Catalog Pantry */}
      <ProductCatalog 
        searchFilter={searchFilter}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* Custom Pickle Builder Lab */}
      <CustomPickleBuilder 
        onAddCustomJarToCart={handleAddCustomJarToCart}
      />

      {/* Subscription Box Section */}
      <SubscriptionSection 
        onSubscribePlan={handleSubscribePlan}
      />

      {/* Reviews & FAQ */}
      <ReviewsFAQ />

      {/* Footer */}
      <Footer />

      {/* Quick View Product Modal */}
      <ProductModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderComplete={handleOrderComplete}
      />

    </div>
  );
}

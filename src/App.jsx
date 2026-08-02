import React, { useState, useEffect } from 'react';
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
import AdminOrdersModal from './components/AdminOrdersModal';
import TrackOrderModal from './components/TrackOrderModal';

import { 
  fetchCloudOrders, 
  saveCloudOrder, 
  updateCloudOrderStatus, 
  clearCloudOrders 
} from './services/ordersApi';

const INITIAL_SAMPLE_ORDER = {
  orderId: 'PKL-849201',
  date: '01 Aug 2026',
  items: [
    { name: 'Grandma’s Avakaya Raw Mango', sizeWeight: '250g', quantity: 2, price: 349 }
  ],
  customer: {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9034716744',
    address: 'Flat 402, Sunshine Heights, MG Road',
    city: 'Bengaluru',
    pincode: '560001'
  },
  paymentMethod: 'UPI (QR Code Scanner)',
  subtotal: 698,
  discount: 70,
  shippingFee: 0,
  grandTotal: 628,
  status: 'Placed'
};

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      cartId: 'default-1',
      id: 'mango-avakaya',
      name: 'Grandma’s Avakaya Raw Mango',
      price: 349,
      sizeWeight: '250g',
      quantity: 1,
      emoji: '🥭🌶️',
      imageBg: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #d97706 100%)'
    }
  ]);

  const [receivedOrders, setReceivedOrders] = useState([INITIAL_SAMPLE_ORDER]);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [adminOrdersModalOpen, setAdminOrdersModalOpen] = useState(false);
  const [trackOrderModalOpen, setTrackOrderModalOpen] = useState(false);
  
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Initial load and Real-time Polling for Cloud Server Orders (Every 4 seconds)
  useEffect(() => {
    let isMounted = true;

    const loadOrdersFromCloud = async () => {
      const orders = await fetchCloudOrders();
      if (isMounted && orders && Array.isArray(orders) && orders.length > 0) {
        setReceivedOrders(orders);
      }
    };

    loadOrdersFromCloud();

    const interval = setInterval(() => {
      loadOrdersFromCloud();
    }, 4000); // Poll cloud server every 4 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Detect URL Route for /admin or #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || path === '/admin' || path.endsWith('/admin')) {
        setAdminOrdersModalOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

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

  // Order complete callback (Syncs newly placed order to Cloud Server Database!)
  const handleOrderComplete = async (newOrder) => {
    if (newOrder) {
      setReceivedOrders(prev => [newOrder, ...prev]);
      const updated = await saveCloudOrder(newOrder);
      if (updated && updated.length > 0) {
        setReceivedOrders(updated);
      }
    }
    setCartItems([]);
  };

  // Update order status from admin panel (Syncs to Cloud Server!)
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setReceivedOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    const updated = await updateCloudOrderStatus(orderId, newStatus);
    if (updated && updated.length > 0) {
      setReceivedOrders(updated);
    }
  };

  // Clear all orders
  const handleClearOrders = async () => {
    if (window.confirm('Are you sure you want to clear all received orders?')) {
      setReceivedOrders([]);
      await clearCloudOrders();
    }
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
        receivedOrdersCount={receivedOrders.length}
        onOpenAdminOrders={() => setAdminOrdersModalOpen(true)}
        onOpenTrackOrder={() => setTrackOrderModalOpen(true)}
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

      {/* Track Order Modal */}
      <TrackOrderModal 
        isOpen={trackOrderModalOpen}
        onClose={() => setTrackOrderModalOpen(false)}
        orders={receivedOrders}
      />

      {/* Admin Orders Received Dashboard Modal (Accessible via /admin or #admin or Admin button) */}
      <AdminOrdersModal 
        isOpen={adminOrdersModalOpen}
        onClose={() => {
          setAdminOrdersModalOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        orders={receivedOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onClearOrders={handleClearOrders}
      />

    </div>
  );
}

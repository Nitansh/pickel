import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Truck, Check } from './Icons';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onProceedCheckout,
  appliedCoupon,
  setAppliedCoupon
}) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0; // 10% off
  const freeShippingThreshold = 499;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'PICKLE10' || couponInput.trim().toUpperCase() === 'FIRSTJAR') {
      setAppliedCoupon(couponInput.trim().toUpperCase());
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try PICKLE10');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      
      {/* Drawer Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          background: '#ffffff',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        
        {/* Drawer Header */}
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-bg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900 }}>Your Pickle Pantry Cart</h3>
            <span style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
              {cartItems.length} items
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ background: subtotal >= freeShippingThreshold ? '#f0fdf4' : '#fffbeb', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--color-card-border)', fontSize: '0.825rem', fontWeight: 700 }}>
          {subtotal >= freeShippingThreshold ? (
            <div style={{ color: 'var(--color-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={16} />
              <span>🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong>!</span>
            </div>
          ) : (
            <div style={{ color: 'var(--color-accent)' }}>
              <span>Add <strong>₹{freeShippingThreshold - subtotal}</strong> more for FREE Shipping!</span>
              <div style={{ height: '6px', background: '#fef3c7', borderRadius: '3px', marginTop: '0.4rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`, background: 'var(--color-accent)', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛒</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>Your Cart is Empty</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Looks like you haven't added any artisanal pickle jars yet.
              </p>
              <button onClick={onClose} className="btn btn-primary">
                Browse Pickle Pantry
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div 
                key={item.cartId || idx}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-card-border)',
                  background: '#faf8f5',
                  position: 'relative'
                }}
              >
                {/* Item Thumbnail */}
                <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', background: item.imageBg || 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                  {item.emoji}
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Weight: {item.sizeWeight} • ₹{item.price} each
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem' }}>
                      <button 
                        onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                        ₹{item.price * item.quantity}
                      </span>
                      <button 
                        onClick={() => onRemoveItem(item.cartId)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid var(--color-card-border)', background: '#ffffff' }}>
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Enter Promo Code (PICKLE10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-card-border)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              />
              <button type="submit" className="btn btn-accent" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-emerald)', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Check size={14} />
                <span>Coupon "{appliedCoupon}" applied! 10% Discount active.</span>
              </div>
            )}

            {couponError && (
              <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, marginBottom: '0.8rem' }}>
                {couponError}
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-emerald)', fontWeight: 700 }}>
                  <span>Coupon Discount (10%)</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Delivery Charge</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-emerald)' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-text-main)', borderTop: '1px solid var(--color-card-border)', paddingTop: '0.6rem', marginTop: '0.2rem' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--color-primary)' }}>₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={onProceedCheckout}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

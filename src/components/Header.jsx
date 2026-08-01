import React, { useState } from 'react';
import { ShoppingBag, Search, Flame, Menu, X, Sparkles, Truck, Package } from './Icons';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  searchFilter, 
  setSearchFilter, 
  activeCategory, 
  setActiveCategory,
  receivedOrdersCount,
  onOpenAdminOrders,
  onOpenTrackOrder
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250, 248, 245, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--color-card-border)' }}>
      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(90deg, #991b1b 0%, #d97706 50%, #15803d 100%)', color: '#ffffff', padding: '0.45rem 1rem', fontSize: '0.825rem', fontWeight: 600, textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Truck size={14} />
            <span>FREE SHIPPING across India above ₹499! Use code <strong style={{ textDecoration: 'underline', color: '#fef08a' }}>PICKLE10</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0,0,0,0.2)', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
            <span>📞 Helpline: </span>
            <a href="tel:9034716744" style={{ color: '#ffffff', textDecoration: 'none' }}>+91 9034716744</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', gap: '1rem' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #b91c1c, #d97706)', color: '#ffffff', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 4px 10px rgba(185, 28, 28, 0.3)' }}>
            🌶️
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-primary-dark)', display: 'block', lineHeight: 1 }}>
              PICKEL<span style={{ color: 'var(--color-accent)' }}>.</span>
            </span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-text-muted)', fontWeight: 700 }}>
              ARTISANAL & SUN-DRIED
            </span>
          </div>
        </a>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '420px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search pickles (e.g. Mango, Garlic, Ghost Pepper, Kimchi)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--color-card-border)',
              background: '#ffffff',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
          />
          {searchFilter && (
            <button 
              onClick={() => setSearchFilter('')}
              style={{ position: 'absolute', right: '0.8rem', color: 'var(--color-text-muted)', background: 'none', border: 'none' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-nav">
          <a href="#catalog" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '0.925rem' }}>Pantry Shop</a>
          <a href="#customizer" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.925rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={16} /> Custom Jar
          </a>
          <button 
            onClick={onOpenTrackOrder}
            style={{ textDecoration: 'none', color: 'var(--color-emerald)', fontWeight: 800, fontSize: '0.925rem', display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Package size={16} /> Track Order
          </button>
          <a href="#subscription" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '0.925rem' }}>Pickle Club</a>
          <a href="#reviews" style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '0.925rem' }}>Story & Reviews</a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          
          <button 
            onClick={onOpenCart}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.2rem', position: 'relative' }}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'var(--color-accent)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                animation: 'pulseHeat 1.5s infinite'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}

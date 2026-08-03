import React, { useState } from 'react';
import { PICKLE_CATEGORIES, PICKLE_PRODUCTS, BASE_PRICE_PER_KG, calculateAgeSurchargePerKg, calculate1KgPrice } from '../data/pickles';
import { Flame, Star, Eye, ShoppingBag, Filter, Check, Package, Sun } from './Icons';

export default function ProductCatalog({ 
  searchFilter, 
  activeCategory, 
  setActiveCategory, 
  onAddToCart, 
  onQuickView 
}) {
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (productId, sizeObj) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeObj
    }));
  };

  // Filter products based on Category, Spice Level, and Search Filter
  const filteredProducts = PICKLE_PRODUCTS.filter(product => {
    // Category match
    if (activeCategory !== 'all' && product.category !== activeCategory) return false;
    
    // Spice filter match
    if (selectedSpiceFilter === 'mild' && product.spiceLevel > 2) return false;
    if (selectedSpiceFilter === 'medium' && (product.spiceLevel < 2 || product.spiceLevel > 3)) return false;
    if (selectedSpiceFilter === 'hot' && product.spiceLevel < 4) return false;

    // Search query match
    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchIngr = product.ingredients.some(i => i.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIngr) return false;
    }

    return true;
  });

  const renderSpiceBadge = (level, label) => {
    if (level === 1) return <span className="badge badge-mild">🌶️ {label}</span>;
    if (level <= 3) return <span className="badge badge-medium">🌶️🌶️ {label}</span>;
    if (level === 4) return <span className="badge badge-hot">🌶️🌶️🌶️ {label}</span>;
    return <span className="badge badge-fiery">🔥 {label}</span>;
  };

  return (
    <section id="catalog" style={{ padding: '3rem 0 4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ color: 'var(--color-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
            Handcrafted Selection
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900 }}>The Pickle Pantry</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0.5rem auto 0 auto' }}>
            Sun-cured in small batches. <strong>Base Price ₹349/kg</strong> + <strong>₹1 per kg for every 4 days of aging</strong> for maximum depth & vintage flavor!
          </p>
        </div>

        {/* Category Tabs & Spice Filter Toolbar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {PICKLE_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'var(--color-primary-dark)' : '#ffffff',
                    color: isActive ? '#ffffff' : 'var(--color-text-main)',
                    border: isActive ? '1px solid var(--color-primary-dark)' : '1px solid var(--color-card-border)',
                    boxShadow: isActive ? '0 4px 12px rgba(153, 27, 27, 0.25)' : 'none'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Filter Toolbar (Spice filter & result count) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              <Filter size={16} />
              <span>Filter Spice Intensity:</span>
              <select
                value={selectedSpiceFilter}
                onChange={(e) => setSelectedSpiceFilter(e.target.value)}
                style={{
                  padding: '0.35rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-card-border)',
                  background: '#faf8f5',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Spice Levels</option>
                <option value="mild">Mild & Sweet (1-2 🌶️)</option>
                <option value="medium">Medium Hot (3 🌶️)</option>
                <option value="hot">Fiery & Extreme (4-5 🔥)</option>
              </select>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Showing <strong style={{ color: 'var(--color-text-main)' }}>{filteredProducts.length}</strong> delicious jar{filteredProducts.length !== 1 ? 's' : ''}
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-card-border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥒</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Pickles Found</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              We couldn't find any pickle matching your search filters.
            </p>
            <button 
              onClick={() => { setActiveCategory('all'); setSelectedSpiceFilter('all'); }}
              className="btn btn-outline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.8rem' }}>
            {filteredProducts.map(product => {
              const currentSize = selectedSizes[product.id] || product.sizes[0];
              const ageSurchargePerKg = calculateAgeSurchargePerKg(product.agedDays);
              const price1kg = calculate1KgPrice(product.agedDays);
              
              return (
                <div key={product.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                  
                  {/* Top Badges (Aged Days & Batch Stock Limit) */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)', color: '#fef08a', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Sun size={12} color="#fef08a" />
                      <span>Aged {product.agedDays} Days (+₹{ageSurchargePerKg}/kg)</span>
                    </div>

                    <div style={{ background: 'rgba(185, 28, 28, 0.9)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Package size={12} />
                      <span>Stock Available: {product.stockKg} kg</span>
                    </div>
                  </div>

                  {/* Quick View Button */}
                  <button 
                    onClick={() => onQuickView(product)}
                    style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2, background: '#ffffff', border: '1px solid var(--color-card-border)', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                    title="Quick View Product Details"
                  >
                    <Eye size={16} />
                  </button>

                  {/* Visual Header Banner */}
                  <div style={{
                    height: '180px',
                    background: product.imageBg,
                    borderTopLeftRadius: 'calc(var(--radius-md) - 1px)',
                    borderTopRightRadius: 'calc(var(--radius-md) - 1px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '4.2rem', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.25))' }}>
                      {product.emoji}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    
                    {/* Spice Level & Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      {renderSpiceBadge(product.spiceLevel, product.spiceLabel)}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem' }}>
                        <Star size={14} fill="#f59e0b" />
                        <span>{product.rating}</span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.3 }}>
                      {product.name}
                    </h3>

                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginBottom: '0.8rem', flex: 1 }}>
                      {product.subtitle}
                    </p>

                    {/* Age Pricing Explanation Banner */}
                    <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.6rem', fontSize: '0.725rem', color: '#854d0e', marginBottom: '0.9rem', fontWeight: 700 }}>
                      🏷️ Base ₹349/kg + ₹{ageSurchargePerKg}/kg ({product.agedDays}d @ +₹1/kg per 4d) = ₹{price1kg}/kg
                    </div>


                    {/* Weight Options Selector */}
                    <div style={{ marginBottom: '1.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                          Select Size:
                        </label>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 800 }}>
                          {product.stockKg} kg Batch
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {product.sizes.map(sz => {
                          const isSelected = currentSize.weight === sz.weight;
                          return (
                            <button
                              key={sz.weight}
                              onClick={() => handleSizeChange(product.id, sz)}
                              style={{
                                flex: 1,
                                padding: '0.35rem 0.2rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-card-border)',
                                background: isSelected ? 'var(--color-primary-light)' : '#ffffff',
                                color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {sz.weight}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price & Add to Cart Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-card-border)', paddingTop: '0.8rem', marginTop: 'auto' }}>
                      <div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                          ₹{currentSize.price}
                        </span>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                          Includes {product.agedDays}d Aging
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(product, currentSize)}
                        className="btn btn-primary"
                        style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                      >
                        <ShoppingBag size={15} />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}


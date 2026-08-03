import React, { useState } from 'react';
import { X, Star, Flame, ShieldCheck, Sun, ShoppingBag, Utensils, Check, Package } from './Icons';
import { BASE_PRICE_PER_KG, calculateAgeSurchargePerKg, calculate1KgPrice } from '../data/pickles';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : { weight: '250g', price: product.price });
  const ageSurchargePerKg = calculateAgeSurchargePerKg(product.agedDays);
  const price1kg = calculate1KgPrice(product.agedDays);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: 0 }}>
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10, background: '#ffffff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}
        >
          <X size={20} />
        </button>

        {/* Product Visual Banner */}
        <div style={{ height: '220px', background: product.imageBg || 'linear-gradient(135deg, #b91c1c, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: '5.5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
            {product.emoji}
          </span>
          
          <div style={{ position: 'absolute', bottom: '12px', left: '15px', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(0,0,0,0.7)', color: '#fef08a', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sun size={14} color="#fef08a" />
              <span>Aged {product.agedDays} Days • Sun Dried</span>
            </div>

            <div style={{ background: 'rgba(185, 28, 28, 0.95)', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Package size={14} />
              <span>Available Stock: {product.stockKg || 10} kg Total Batch</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.8rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span className="badge badge-hot">🌶️ Level {product.spiceLevel} Heat ({product.spiceLabel})</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f59e0b', fontWeight: 700 }}>
              <Star size={16} fill="#f59e0b" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.2rem' }}>{product.name}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', marginBottom: '1.2rem' }}>{product.subtitle}</p>

          {/* Age Pricing & Stock Breakdown Card */}
          <div style={{ background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)', border: '1px solid #fde047', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.4rem', color: '#713f12' }}>
            <div style={{ fontWeight: 900, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sun size={16} color="#b45309" />
                <span>Vintage Aging Value Calculation</span>
              </span>
              <span style={{ background: '#b45309', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem' }}>
                +₹1/kg per 4 Days
              </span>
            </div>

            <div style={{ fontSize: '0.825rem', lineHeight: 1.5, color: '#854d0e' }}>
              • <strong>Base Price per Kg:</strong> ₹{BASE_PRICE_PER_KG}/kg<br />
              • <strong>Sun-Cured Maturation ({product.agedDays} Days):</strong> +₹{ageSurchargePerKg}/kg (Calculated at +₹1 per kg for every 4 days passed)<br />
              • <strong>Total 1 Kg Price:</strong> ₹{price1kg}/kg<br />
              • <strong>Batch Quantity Available:</strong> <span style={{ color: '#991b1b', fontWeight: 900 }}>{product.stockKg || 10} kg available in current batch</span>
            </div>
          </div>


          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {product.description}
          </p>

          {/* Size Options Selector */}
          {product.sizes && (
            <div style={{ marginBottom: '1.5rem', background: '#faf8f5', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                Select Jar Weight:
              </label>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {product.sizes.map(sz => {
                  const isSel = selectedSize.weight === sz.weight;
                  return (
                    <button
                      key={sz.weight}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        flex: 1,
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSel ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)',
                        background: isSel ? '#ffffff' : 'transparent',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        color: isSel ? 'var(--color-primary)' : 'var(--color-text-main)',
                        boxShadow: isSel ? 'var(--shadow-sm)' : 'none'
                      }}
                    >
                      <div>{sz.weight}</div>
                      <div style={{ fontSize: '0.8rem', color: isSel ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>₹{sz.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ingredients List */}
          {product.ingredients && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Ingredient Breakdown:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} style={{ background: '#ffffff', border: '1px solid var(--color-card-border)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Badges */}
          {product.dietary && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
              {product.dietary.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
                  <ShieldCheck size={16} />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-card-border)', paddingTop: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Selected Price</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                ₹{selectedSize.price}
              </span>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, selectedSize);
                onClose();
              }}
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}
            >
              <ShoppingBag size={18} />
              <span>Add to Cart ({selectedSize.weight})</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}


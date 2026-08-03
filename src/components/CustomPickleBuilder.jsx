import React, { useState } from 'react';
import { Sparkles, Flame, Check, ShoppingBag, Award, Sun } from './Icons';

const BASES = [
  { id: 'mango', name: 'Raw Andhra Mango', icon: '🥭', price: 0 },
  { id: 'garlic', name: 'Plump Whole Garlic', icon: '🧄', price: 20 },
  { id: 'redchili', name: 'Thick Red Banarasi Chili', icon: '🌶️', price: 30 },
  { id: 'mixed', name: 'Carrot-Radish-Cauliflower Mix', icon: '🥕', price: 10 },
  { id: 'tomato', name: 'Heirloom Green Tomato', icon: '🍅', price: 15 }
];

const SPICE_BLENDS = [
  { id: 'avakaya', name: 'Andhra Avakaya (Mustard & Guntur Chili)', icon: '🌶️' },
  { id: 'punjabi', name: 'Punjabi Saunf & Ajwain (Fennel & Carom)', icon: '🌾' },
  { id: 'chunda', name: 'Gujarati Sweet Jaggery & Saffron', icon: '🍯' },
  { id: 'sichuan', name: 'Sichuan Chili Oil Crisp & Garlic', icon: '🥢' }
];

const OIL_BASES = [
  { id: 'mustard', name: 'Cold-Pressed Kachi Ghani Mustard Oil', price: 0 },
  { id: 'sesame', name: 'Toasted Til (Sesame) Seed Oil', price: 25 },
  { id: 'olive', name: 'Extra Virgin Olive Oil', price: 45 },
  { id: 'brine', name: 'Oil-Free Citrus Vinegar Brine', price: 0 }
];

export default function CustomPickleBuilder({ onAddCustomJarToCart }) {
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedSpice, setSelectedSpice] = useState(SPICE_BLENDS[0]);
  const [selectedOil, setSelectedOil] = useState(OIL_BASES[0]);
  const [heatLevel, setHeatLevel] = useState(3);
  const [jarName, setJarName] = useState('My Secret Artisanal Jar');
  const [jarSize, setJarSize] = useState('500g');
  const [customAgeDays, setCustomAgeDays] = useState(40);

  const weightKg = jarSize === '250g' ? 0.25 : jarSize === '500g' ? 0.5 : 1.0;
  const baseJarPrice = jarSize === '250g' ? 200 : jarSize === '500g' ? 400 : 800;
  const ageSurchargePerKg = Math.floor(customAgeDays / 4); // +1 RS per kg for every 4 days
  const ageSurchargeForJar = Math.round(ageSurchargePerKg * weightKg);
  const totalPrice = baseJarPrice + selectedBase.price + selectedOil.price + ageSurchargeForJar;

  const handleCreateJar = () => {
    const customProduct = {
      id: 'custom-' + Date.now(),
      name: jarName || 'My Custom Pickle Jar',
      subtitle: `${selectedBase.name} in ${selectedOil.name}`,
      category: 'custom',
      price: totalPrice,
      spiceLevel: heatLevel,
      spiceLabel: heatLevel <= 2 ? 'Mild' : heatLevel === 3 ? 'Medium Hot' : 'Fiery Hot',
      agedDays: customAgeDays,
      emoji: `${selectedBase.icon}🧪`,
      description: `Custom handcrafted jar made with ${selectedBase.name}, ${selectedSpice.name}, steeped in ${selectedOil.name}. Aged for ${customAgeDays} days (+₹${ageSurchargeForJar} aging rate).`,
      isCustom: true,
      customDetails: {
        base: selectedBase.name,
        spice: selectedSpice.name,
        oil: selectedOil.name,
        heat: heatLevel,
        agedDays: customAgeDays
      }
    };

    onAddCustomJarToCart(customProduct, { weight: jarSize, price: totalPrice });
  };




  return (
    <section id="customizer" style={{ padding: '4rem 0', background: 'linear-gradient(180deg, var(--color-bg) 0%, #f7f1e3 100%)', borderTop: '1px solid var(--color-card-border)', borderBottom: '1px solid var(--color-card-border)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-accent-light)', color: 'var(--color-accent)', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <Sparkles size={16} /> Pickle Lab & Workshop
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Build Your Own Custom Pickle Jar</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
            Select your favorite fruit/veggie base, aromatic spice blend, cold-pressed oil, and heat level. We will freshly craft and pack it with your custom named label!
          </p>
        </div>

        {/* Wizard Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Selection Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            
            {/* Step 1: Base Selection */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                <span style={{ background: 'var(--color-primary)', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</span>
                <span>Select Fruit / Vegetable Base</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                {BASES.map(b => {
                  const isSel = selectedBase.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBase(b)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSel ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)',
                        background: isSel ? 'var(--color-primary-light)' : '#ffffff',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '1.8rem' }}>{b.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isSel ? 'var(--color-primary)' : 'var(--color-text-main)' }}>{b.name}</div>
                      {b.price > 0 && <div style={{ fontSize: '0.7rem', color: 'var(--color-accent)' }}>+₹{b.price}</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Spice Blend */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                <span style={{ background: 'var(--color-primary)', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</span>
                <span>Choose Aromatic Spice Mix</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SPICE_BLENDS.map(sp => {
                  const isSel = selectedSpice.id === sp.id;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => setSelectedSpice(sp)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSel ? '2px solid var(--color-accent)' : '1px solid var(--color-card-border)',
                        background: isSel ? 'var(--color-accent-light)' : '#ffffff',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.875rem' }}>
                        <span>{sp.icon}</span>
                        <span>{sp.name}</span>
                      </div>
                      {isSel && <Check size={18} color="var(--color-accent)" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Oil & Heat Level */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                <span style={{ background: 'var(--color-primary)', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>3</span>
                <span>Oil Base & Heat Intensity</span>
              </div>

              {/* Oil Selection */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>Oil Type:</label>
                <select
                  value={selectedOil.name}
                  onChange={(e) => {
                    const found = OIL_BASES.find(o => o.name === e.target.value);
                    if (found) setSelectedOil(found);
                  }}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', background: '#fff', fontWeight: 700, fontSize: '0.875rem' }}
                >
                  {OIL_BASES.map(o => (
                    <option key={o.name} value={o.name}>{o.name} {o.price > 0 ? `(+₹${o.price})` : ''}</option>
                  ))}
                </select>
              </div>

              {/* Heat Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <span>Chili Heat Level:</span>
                  <span style={{ color: 'var(--color-primary)' }}>Level {heatLevel} / 5 🌶️</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={heatLevel}
                  onChange={(e) => setHeatLevel(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
              </div>

            </div>

          </div>

          {/* Right Column: Live Custom Jar Preview */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card glow-effect" style={{ padding: '2rem', textAlign: 'center', background: '#ffffff' }}>
              
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: '0.8rem' }}>
                🧪 Live Custom Jar Preview
              </div>

              {/* Jar Mockup Box */}
              <div style={{
                background: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
                color: '#ffffff',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                position: 'relative'
              }}>
                <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>{selectedBase.icon}🌶️</div>
                
                {/* Custom Label Box */}
                <div style={{ background: 'linear-gradient(135deg, #fef08a, #fde047)', color: '#1c1917', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px dashed #b45309' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>PICKEL ARTISANAL CRAFT</div>
                  <input
                    type="text"
                    value={jarName}
                    onChange={(e) => setJarName(e.target.value)}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-heading)',
                      border: 'none',
                      background: 'transparent',
                      color: '#991b1b',
                      outline: 'none',
                      margin: '0.2rem 0'
                    }}
                    placeholder="Name Your Jar..."
                  />
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#78350f' }}>
                    {selectedBase.name} • {selectedOil.name}
                  </div>
                </div>

              </div>

              {/* Size Selector */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>Select Jar Size:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['250g', '500g', '1kg'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => setJarSize(sz)}
                      style={{
                        flex: 1,
                        padding: '0.4rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        border: jarSize === sz ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)',
                        background: jarSize === sz ? 'var(--color-primary-light)' : '#ffffff',
                        color: jarSize === sz ? 'var(--color-primary)' : 'var(--color-text-main)'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Add Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--color-card-border)' }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Custom Price</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-primary)' }}>₹{totalPrice}</span>
                </div>
                
                <button
                  onClick={handleCreateJar}
                  className="btn btn-primary"
                  style={{ padding: '0.8rem 1.4rem' }}
                >
                  <ShoppingBag size={18} />
                  <span>Add Custom Jar</span>
                </button>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                <Award size={14} color="var(--color-accent)" />
                <span>Handcrafted & packed within 24 hours of order</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Flame, Sparkles, ShieldCheck, Sun, Star, ArrowRight } from './Icons';

export default function Hero({ onExploreClick, onCustomizerClick }) {
  return (
    <section style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow Orbs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-50px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(185, 28, 28, 0.12) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Hero Text Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid #fecaca', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.2rem' }}>
              <Sun size={16} color="#d97706" />
              <span>Small-Batch • Sun-Dried in Terracotta Barnis</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              Real Heritage Taste.<br />
              <span style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Zero Preservatives.
              </span>
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '540px' }}>
              Handcrafted with cold-pressed Kachi Ghani oils, organic jaggery, and farm-fresh spices. Aged naturally under the warm sun to unlock rich authentic flavor.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button onClick={onExploreClick} className="btn btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <span>Order Pickles Now</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onCustomizerClick} className="btn btn-accent" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <Sparkles size={18} />
                <span>Build Custom Jar</span>
              </button>
            </div>

            {/* USPs List */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--color-card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                <ShieldCheck size={18} color="var(--color-emerald)" />
                <span>100% Preservative Free</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                <Sun size={18} color="var(--color-accent)" />
                <span>Traditional Sun-Dried</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                <Flame size={18} color="var(--color-primary)" />
                <span>Cold-Pressed Oils</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase Card */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card glow-effect" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(145deg, #ffffff 0%, #faf5eb 100%)', position: 'relative' }}>
              
              {/* Top Floating Badge */}
              <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--color-accent)', color: '#ffffff', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🔥 Featured Jar
              </div>

              {/* Jar Graphic Illustration Container */}
              <div style={{
                height: '240px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                margin: '1rem 0',
                position: 'relative',
                boxShadow: '0 15px 30px rgba(185, 28, 28, 0.3)',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '5.5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))', animation: 'pulseHeat 3s infinite' }}>
                  🥭🌶️
                </div>
                <div style={{ position: 'absolute', bottom: '12px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700 }}>
                  Aged 45 Days • Terracotta Matures
                </div>
              </div>

              {/* Featured Jar Name & Price */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                Grandma’s Avakaya Raw Mango
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Andhra Sun-Dried Raw Mango in Mustard Oil & Crushed Guntur Chilies
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Starting from</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹349</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '0.4rem' }}>(250g Jar)</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem' }}>
                  <Star size={16} fill="#f59e0b" />
                  <span>4.9 (428)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Counter Bar */}
        <div style={{
          marginTop: '3.5rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem 2rem',
          border: '1px solid var(--color-card-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary)' }}>50,000+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Happy Pickle Lovers</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-accent)' }}>4.9 / 5.0 ★</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Average Customer Rating</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-emerald)' }}>100%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Pure Cold-Pressed Oils</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary-dark)' }}>0%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Artificial Preservatives</div>
          </div>
        </div>

      </div>
    </section>
  );
}

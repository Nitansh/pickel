import React, { useState } from 'react';
import { Mail, Check, Heart, ShieldCheck, Truck, Award } from './Icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#1c1917', color: '#f5f5f4', padding: '4rem 0 2rem 0', borderTop: '1px solid #292524' }}>
      <div className="container">
        
        {/* Top Newsletter Card */}
        <div style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#ffffff', boxShadow: 'var(--shadow-lg)' }}>
          <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌶️💌</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.4rem' }}>Get 15% Off Your First Pickle Order</h3>
          <p style={{ color: '#fecaca', fontSize: '0.95rem', maxWidth: '520px', marginBottom: '1.5rem' }}>
            Subscribe to our newsletter for seasonal small-batch secret drop alerts, pickle pairing recipes, and exclusive discount codes!
          </p>

          {subscribed ? (
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-full)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} />
              <span>You're subscribed! Use code FIRSTJAR for 15% off.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '440px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', border: 'none', fontSize: '0.9rem', outline: 'none' }}
              />
              <button type="submit" className="btn btn-accent" style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Footer Navigation Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ background: '#b91c1c', color: '#ffffff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                🌶️
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                PICKEL<span style={{ color: '#d97706' }}>.</span>
              </span>
            </div>
            <p style={{ color: '#a8a29e', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Authentic artisanal pickles sun-dried under traditional age-old heritage recipes. 100% natural, preservative-free.
            </p>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fef08a', background: 'rgba(255,255,255,0.08)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', display: 'inline-block', marginBottom: '1rem' }}>
              📞 Helpline / Support: <a href="tel:9034716744" style={{ color: '#ffffff', textDecoration: 'none' }}>+91 9034716744</a>
            </div>

            {/* Website QR Code Box */}
            <div style={{ background: '#ffffff', color: '#1c1917', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: '0.8rem', border: '1px solid var(--color-card-border)' }}>
              <img src="/website_qr.png" alt="Scan Website QR Code" style={{ width: '70px', height: '70px', borderRadius: '6px' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-primary)' }}>Scan to Visit Store 🌶️</div>
                <div style={{ fontSize: '0.7rem', color: '#78716c' }}>Scan with phone camera</div>
                <a href="/website_qr.png" download="pickel_website_qr.png" style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 800, textDecoration: 'underline', marginTop: '0.2rem', display: 'inline-block' }}>
                  Download QR Code
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Quick Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <a href="#catalog" style={{ color: '#a8a29e', textDecoration: 'none' }}>Pantry Shop</a>
              <a href="#customizer" style={{ color: '#a8a29e', textDecoration: 'none' }}>Build Custom Jar</a>
              <a href="#subscription" style={{ color: '#a8a29e', textDecoration: 'none' }}>The Pickle Club Subscription</a>
              <a href="#reviews" style={{ color: '#a8a29e', textDecoration: 'none' }}>Customer Reviews & FAQ</a>
            </div>
          </div>

          {/* Trust Guarantee */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Our Quality Promise</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#a8a29e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="#15803d" />
                <span>100% Sun-Dried & Cold-Pressed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={16} color="#d97706" />
                <span>Express Doorstep Delivery Across India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} color="#b91c1c" />
                <span>Zero Artificial Colors or Flavors</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #292524', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#78716c' }}>
          <div>
            © {new Date().getFullYear()} PICKEL Artisanal Foods. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>Crafted with</span>
            <Heart size={14} fill="#dc2626" color="#dc2626" />
            <span>for pickle lovers everywhere.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

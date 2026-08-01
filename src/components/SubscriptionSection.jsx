import React from 'react';
import { SUBSCRIPTION_PLANS } from '../data/pickles';
import { Sparkles, Check, Gift, ArrowRight, ShieldCheck } from './Icons';

export default function SubscriptionSection({ onSubscribePlan }) {
  return (
    <section id="subscription" style={{ padding: '4rem 0', background: '#ffffff', borderTop: '1px solid var(--color-card-border)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <Gift size={16} /> Pickle Lovers Club 📦
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Never Run Out of Delicious Pickles</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
            Join <strong>The Pickle Club</strong> and get a handpicked box of 3 seasonal sun-dried jars delivered right to your doorstep every month with exclusive discounts!
          </p>
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {SUBSCRIPTION_PLANS.map(plan => (
            <div 
              key={plan.id}
              className="glass-card"
              style={{
                padding: '2.2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular ? '2px solid var(--color-accent)' : '1px solid var(--color-card-border)',
                background: plan.popular ? 'linear-gradient(180deg, #ffffff 0%, #fffbeb 100%)' : '#ffffff'
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-accent)', color: '#ffffff', padding: '0.25rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)' }}>
                  ★ Most Popular Choice
                </div>
              )}

              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.2rem' }}>{plan.name}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '1.2rem' }}>{plan.frequency}</div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-primary)' }}>₹{plan.price}</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>₹{plan.originalPrice}</span>
                <span style={{ background: '#fef2f2', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                  {plan.savings}
                </span>
              </div>

              {/* Features Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', flex: 1 }}>
                {plan.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    <div style={{ background: 'var(--color-emerald-light)', color: 'var(--color-emerald)', borderRadius: '50%', padding: '0.15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSubscribePlan(plan)}
                className={`btn ${plan.popular ? 'btn-accent' : 'btn-primary'}`}
                style={{ padding: '0.85rem', fontSize: '0.95rem' }}
              >
                <span>Subscribe Now</span>
                <ArrowRight size={16} />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

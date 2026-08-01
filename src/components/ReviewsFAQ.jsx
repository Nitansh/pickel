import React, { useState } from 'react';
import { REVIEWS } from '../data/pickles';
import { Star, ShieldCheck, ChevronDown, ChevronUp, HelpCircle } from './Icons';

const FAQS = [
  {
    q: 'How long do Pickel jars last without preservatives?',
    a: 'Because our pickles are naturally preserved using cold-pressed Kachi Ghani mustard oil, rock salt, and sun-drying techniques, unopened jars have a shelf life of 12 months! Once opened, keep the jar sealed with oil covering the top surface.'
  },
  {
    q: 'Why does oil float to the top of my pickle jar?',
    a: 'Oil floating at the top is a natural protective barrier in authentic traditional pickles! It keeps oxygen away from the spices. Always use a dry, clean spoon and ensure ingredients stay submerged under oil.'
  },
  {
    q: 'Are all your pickles vegan and gluten-free?',
    a: 'Most of our pickles (including Mango Avakaya, Ghost Pepper Oil, Sichuan Crisp, and Kimchi) are 100% vegan. Check the dietary badges on each product page for exact allergen details.'
  },
  {
    q: 'Can I customize the oil type or spice heat level?',
    a: 'Yes! Use our "Build Your Own Pickle Jar" section to pick your preferred base fruit/veggie, spice mix, oil type (Mustard, Sesame, Olive, or Oil-Free), and spice heat level (1 to 5 chilies).'
  }
];

export default function ReviewsFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="reviews" style={{ padding: '4rem 0', background: '#faf8f5', borderTop: '1px solid var(--color-card-border)' }}>
      <div className="container">
        
        {/* Testimonials */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ color: 'var(--color-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
            Real Foodies, Real Ratings
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900 }}>What Our Pickle Connoisseurs Say</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {REVIEWS.map(rev => (
            <div key={rev.id} className="glass-card" style={{ padding: '1.5rem', background: '#ffffff', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rev.date}</span>
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-main)', fontStyle: 'italic', marginBottom: '1.2rem', flex: 1, lineHeight: 1.6 }}>
                "{rev.comment}"
              </p>

              <div style={{ borderTop: '1px solid var(--color-card-border)', paddingTop: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{rev.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rev.city}</div>
                </div>

                {rev.verified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--color-emerald)', fontSize: '0.75rem', fontWeight: 700 }}>
                    <ShieldCheck size={14} />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <HelpCircle size={22} color="var(--color-primary)" />
              <span>Frequently Asked Questions</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} style={{ background: '#ffffff', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{ width: '100%', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main)', textAlign: 'left', cursor: 'pointer' }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--color-primary)" /> : <ChevronDown size={18} color="var(--color-text-muted)" />}
                  </button>
                  
                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.2rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.925rem', lineHeight: 1.6, borderTop: '1px solid #f1ebd9', paddingTop: '0.8rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

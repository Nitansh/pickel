import React, { useState } from 'react';
import { X, Search, Phone, Package, Truck, Check, MapPin, ShieldCheck } from './Icons';

export default function TrackOrderModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedOrders, setMatchedOrders] = useState([]);

  const handleTrackSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    
    if (!inputQuery.trim()) {
      setMatchedOrders([]);
      return;
    }

    const q = inputQuery.trim().toLowerCase();
    // Match by phone number or order ID
    const found = orders.filter(o => {
      const matchPhone = o.customer.phone.replace(/\D/g, '').includes(q.replace(/\D/g, ''));
      const matchOrderId = o.orderId.toLowerCase().includes(q);
      return matchPhone || matchOrderId;
    });

    setMatchedOrders(found);
  };

  const getStepNumber = (status) => {
    if (status === 'Jarring & Oil') return 2;
    if (status === 'Shipped') return 3;
    if (status === 'Delivered') return 4;
    return 1; // Placed
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: 0 }}>
        
        {/* Header */}
        <div style={{ padding: '1.2rem 1.5rem', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={22} color="var(--color-primary)" />
              <span>Track Your Pickle Order</span>
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
              Enter your mobile number or Order ID to view live delivery status
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.8rem' }}>

          {/* Search Form */}
          <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                required
                placeholder="Enter Mobile Number (e.g. 9876543210) or Order ID..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--color-card-border)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
              <Search size={18} />
              <span>Track Status</span>
            </button>
          </form>

          {/* Results Area */}
          {searched && matchedOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: '#faf8f5', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-card-border)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>🔍</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.3rem' }}>No Active Orders Found</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                We couldn't find any orders matching "<strong>{inputQuery}</strong>". Please check your mobile number or Order ID.
              </p>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Need help? Call Customer Helpline: <a href="tel:9034716744" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>+91 9034716744</a>
              </div>
            </div>
          )}

          {matchedOrders.map(order => {
            const activeStep = getStepNumber(order.status);

            return (
              <div key={order.orderId} style={{ background: '#faf8f5', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-md)', padding: '1.4rem', marginBottom: '1.2rem' }}>
                
                {/* Order Top Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                      Order #{order.orderId}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.8rem' }}>
                      Placed on: {order.date}
                    </span>
                  </div>

                  <span style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 800, padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)' }}>
                    Current Status: {order.status || 'Placed'}
                  </span>
                </div>

                {/* Progress Step Bar */}
                <div style={{ marginBottom: '1.5rem', background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    
                    {/* Step 1 */}
                    <div style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                      <div style={{ background: activeStep >= 1 ? 'var(--color-emerald)' : '#e7e5e4', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem auto', fontSize: '0.85rem', fontWeight: 800 }}>
                        {activeStep > 1 ? '✓' : '1'}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activeStep >= 1 ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                        Order Placed
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                      <div style={{ background: activeStep >= 2 ? 'var(--color-emerald)' : '#e7e5e4', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem auto', fontSize: '0.85rem', fontWeight: 800 }}>
                        {activeStep > 2 ? '✓' : '2'}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activeStep >= 2 ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                        Jarring & Oil
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                      <div style={{ background: activeStep >= 3 ? 'var(--color-emerald)' : '#e7e5e4', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem auto', fontSize: '0.85rem', fontWeight: 800 }}>
                        {activeStep > 3 ? '✓' : '3'}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activeStep >= 3 ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                        Out for Delivery
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                      <div style={{ background: activeStep >= 4 ? 'var(--color-emerald)' : '#e7e5e4', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem auto', fontSize: '0.85rem', fontWeight: 800 }}>
                        4
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activeStep >= 4 ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                        Delivered
                      </div>
                    </div>

                  </div>
                </div>

                {/* Items & Shipping Address */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: '0.3rem', color: 'var(--color-text-main)' }}>Items In Package:</div>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
                        • {item.name} ({item.sizeWeight}) x{item.quantity}
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, marginBottom: '0.3rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={14} color="var(--color-primary)" /> Delivery Destination:
                    </div>
                    <div style={{ color: 'var(--color-text-muted)' }}>
                      {order.customer.name}<br />
                      {order.customer.address}, {order.customer.city} ({order.customer.pincode})
                    </div>
                  </div>
                </div>

                {/* Helpline Banner inside Tracking */}
                <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <div style={{ color: 'var(--color-text-muted)' }}>
                    Payment Status: <strong style={{ color: 'var(--color-emerald)' }}>PAID ({order.paymentMethod})</strong>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--color-primary)' }}>
                    Need Helpline Support? Call <a href="tel:9034716744" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>+91 9034716744</a>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

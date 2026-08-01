import React, { useState } from 'react';
import triggerConfetti from '../utils/confetti';
import { X, Check, ShieldCheck, CreditCard, Smartphone, Truck, Package, Printer, Sparkles, MapPin, Phone, User, Mail } from './Icons';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  appliedCoupon,
  onOrderComplete 
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Processing / Confirmation
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Shipping Form State
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9876543210',
    address: 'Flat 402, Sunshine Heights, MG Road',
    city: 'Bengaluru',
    pincode: '560001',
    upiId: 'priya@okicici'
  });

  const [orderInfo, setOrderInfo] = useState(null);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayAndOrder = (e) => {
    e.preventDefault();
    setStep(3); // Processing

    // Trigger confetti animation
    try {
      triggerConfetti();
    } catch (err) {
      // Ignore if canvas error
    }

    const createdOrder = {
      orderId: 'PKL-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cartItems,
      customer: formData,
      paymentMethod: paymentMethod.toUpperCase(),
      subtotal,
      discount,
      shippingFee,
      grandTotal,
      status: 'Placed',
      estimatedDelivery: '3-4 Business Days'
    };

    setOrderInfo(createdOrder);
    onOrderComplete(createdOrder);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', padding: 0 }}>
        
        {/* Modal Header */}
        <div style={{ padding: '1.2rem 1.5rem', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🌶️ Secure Checkout</span>
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
              {step === 1 && 'Step 1 of 3: Shipping & Delivery Details'}
              {step === 2 && 'Step 2 of 3: Payment Method'}
              {step === 3 && 'Order Confirmed & Placed!'}
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.8rem' }}>

          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <form onSubmit={() => setStep(2)}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={18} color="var(--color-primary)" />
                <span>Delivery Address</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Street Address / Flat / Building</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Pincode / ZIP</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Continue to Payment Method
              </button>
            </form>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <form onSubmit={handlePayAndOrder}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>
                Select Payment Option
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                
                {/* UPI */}
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: paymentMethod === 'upi' ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)', background: paymentMethod === 'upi' ? 'var(--color-primary-light)' : '#ffffff', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                    <Smartphone size={18} color="var(--color-primary)" />
                    <span>Instant UPI (GPay, PhonePe, Paytm)</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald)', fontWeight: 800 }}>Fastest</span>
                </label>

                {paymentMethod === 'upi' && (
                  <div style={{ padding: '0.8rem 1rem', background: '#faf8f5', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', marginTop: '-0.4rem', marginLeft: '1.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>VPA / UPI ID:</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.85rem' }}
                    />
                  </div>
                )}

                {/* Card */}
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: paymentMethod === 'card' ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)', background: paymentMethod === 'card' ? 'var(--color-primary-light)' : '#ffffff', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <CreditCard size={18} color="var(--color-accent)" />
                    <span>Credit / Debit Card</span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: paymentMethod === 'cod' ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)', background: paymentMethod === 'cod' ? 'var(--color-primary-light)' : '#ffffff', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <Truck size={18} color="var(--color-emerald)" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                </label>

              </div>

              {/* Summary Box */}
              <div style={{ padding: '1rem', background: '#faf8f5', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--color-card-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>
                  <span>Total Amount Payable</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)' }}>₹{grandTotal}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Delivering to: <strong>{formData.name}</strong> ({formData.pincode})
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-ghost" style={{ flex: 1 }}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '0.85rem' }}>
                  Pay ₹{grandTotal} & Place Order
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Order Confirmation & Receipt */}
          {step === 3 && orderInfo && (
            <div style={{ textAlign: 'center' }}>
              
              <div style={{ background: '#f0fdf4', color: 'var(--color-emerald)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', border: '2px solid #bbf7d0' }}>
                <Check size={40} />
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.3rem' }}>Order Successfully Placed! 🎉</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Thank you, <strong>{orderInfo.customer.name}</strong>! Your sun-dried artisanal pickles are being packed.
              </p>

              {/* Order Tracker Bar */}
              <div style={{ background: '#faf8f5', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-card-border)', marginBottom: '1.5rem', textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.8rem' }}>
                  Live Order Tracker (ID: {orderInfo.orderId})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ background: 'var(--color-emerald)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.2rem auto', fontSize: '0.8rem' }}>✓</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Placed</span>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ background: 'var(--color-accent)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.2rem auto', fontSize: '0.8rem' }}>2</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Jarring & Oil</span>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ background: '#e7e5e4', color: '#78716c', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.2rem auto', fontSize: '0.8rem' }}>3</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Shipped</span>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ background: '#e7e5e4', color: '#78716c', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.2rem auto', fontSize: '0.8rem' }}>4</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Delivered</span>
                  </div>
                </div>
              </div>

              {/* Printable Receipt Area */}
              <div style={{ border: '1px dashed var(--color-card-border)', borderRadius: 'var(--radius-md)', padding: '1.2rem', textAlign: 'left', marginBottom: '1.5rem', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.6rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>PICKEL DIGITAL RECEIPT</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Date: {orderInfo.date}</span>
                </div>

                {orderInfo.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span>{item.name} ({item.sizeWeight}) x{item.quantity}</span>
                    <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}

                <div style={{ borderTop: '1px solid var(--color-card-border)', paddingTop: '0.6rem', marginTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1rem', color: 'var(--color-primary)' }}>
                  <span>Total Amount Paid</span>
                  <span>₹{orderInfo.grandTotal} ({orderInfo.paymentMethod})</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handlePrintReceipt} className="btn btn-outline" style={{ flex: 1 }}>
                  <Printer size={18} />
                  <span>Print Receipt</span>
                </button>
                <button onClick={onClose} className="btn btn-primary" style={{ flex: 1 }}>
                  Done & Continue
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

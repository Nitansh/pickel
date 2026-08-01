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
  const [utrNumber, setUtrNumber] = useState('');
  
  // Shipping Form State
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9034716744',
    address: 'Flat 402, Sunshine Heights, MG Road',
    city: 'Bengaluru',
    pincode: '560001',
    upiId: '9034716744@ybl'
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
      paymentMethod: paymentMethod.toUpperCase() + (utrNumber ? ` (Ref: ${utrNumber})` : ''),
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
              {step === 2 && 'Step 2 of 3: Scan UPI QR & Complete Payment'}
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
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Phone Number (For Tracking)</label>
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
                Continue to Payment Scanner
              </button>
            </form>
          )}

          {/* STEP 2: Payment Scanner & UPI QR */}
          {step === 2 && (
            <form onSubmit={handlePayAndOrder}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.8rem', textAlign: 'center' }}>
                Scan QR Code to Complete Payment of <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: 900 }}>₹{grandTotal}</span>
              </h4>

              {/* QR Code Card */}
              <div style={{ background: '#ffffff', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-md)', padding: '1.2rem', textAlign: 'center', marginBottom: '1.2rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                  SCAN QR WITH ANY UPI APP (PHONEPE, GPAY, PAYTM)
                </div>

                <img
                  src="/phonepe_qr.png"
                  alt="UPI Payment QR Code"
                  style={{ width: '220px', height: 'auto', display: 'block', margin: '0 auto 0.8rem auto', borderRadius: '12px', border: '1px solid var(--color-card-border)', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = 'none';
                  }}
                />

                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                  UPI ID: 9034716744@ybl
                </div>

                {/* Helpline Notice */}
                <div style={{ background: 'var(--color-accent-light)', border: '1px solid #fde68a', color: 'var(--color-accent)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-block' }}>
                  📞 Need Payment Help? Call Support: <a href="tel:9034716744" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>+91 9034716744</a>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <label style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: paymentMethod === 'upi' ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)', background: paymentMethod === 'upi' ? 'var(--color-primary-light)' : '#ffffff', cursor: 'pointer', textAlign: 'center', fontSize: '0.825rem', fontWeight: 800 }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} style={{ marginRight: '0.3rem' }} />
                  UPI Scanner
                </label>
                <label style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: paymentMethod === 'cod' ? '2px solid var(--color-primary)' : '1px solid var(--color-card-border)', background: paymentMethod === 'cod' ? 'var(--color-primary-light)' : '#ffffff', cursor: 'pointer', textAlign: 'center', fontSize: '0.825rem', fontWeight: 800 }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ marginRight: '0.3rem' }} />
                  Cash on Delivery
                </label>
              </div>

              {/* Transaction Ref Input */}
              {paymentMethod === 'upi' && (
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                    Transaction UTR / Reference ID (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 420918291048"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-ghost" style={{ flex: 1 }}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '0.85rem' }}>
                  I Have Paid ₹{grandTotal} (Confirm Order)
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
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'center', fontWeight: 700 }}>
                  Need order support? Call Helpline: <a href="tel:9034716744" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>+91 9034716744</a>
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

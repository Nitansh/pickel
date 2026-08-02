import React, { useState } from 'react';
import { X, Package, Search, Trash2, Download, Truck, MapPin, Phone, Mail, Lock } from './Icons';

const ADMIN_PASSWORD = 'nitansh.bareja@gmail.com';

export default function AdminOrdersModal({ isOpen, onClose, orders, onUpdateOrderStatus, onClearOrders }) {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('pickel_admin_auth') === 'true';
    } catch(e) {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem('pickel_admin_auth', 'true');
      } catch(e) {}
    } else {
      setAuthError('Invalid Admin Password. Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    try {
      sessionStorage.removeItem('pickel_admin_auth');
    } catch(e) {}
  };

  // Unauthenticated Login Modal View
  if (!isAuthenticated) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: 0, overflow: 'hidden' }}>
          
          {/* Top Header */}
          <div style={{ padding: '1.2rem 1.5rem', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'var(--color-primary-light)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
                <Lock size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary-dark)', margin: 0 }}>
                  Admin Authorization
                </h3>
                <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                  Restricted access area
                </div>
              </div>
            </div>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
              <X size={22} />
            </button>
          </div>

          {/* Login Form Body */}
          <form onSubmit={handleLogin} style={{ padding: '2rem 1.8rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔒</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
                Enter Admin Password
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Please authenticate with your master admin email/password to manage store orders.
              </p>
            </div>

            {authError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.65rem 0.9rem', borderRadius: 'var(--radius-sm)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>
                ⚠️ {authError}
              </div>
            )}

            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
                Password:
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (authError) setAuthError('');
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--color-card-border)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', justifyContent: 'center', fontSize: '0.95rem' }}>
              <Lock size={18} />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    if (!order) return false;
    if (statusFilter !== 'all' && (order.status || 'Placed') !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchId = order.orderId ? order.orderId.toLowerCase().includes(q) : false;
      const matchName = order.customer && order.customer.name ? order.customer.name.toLowerCase().includes(q) : false;
      const matchPhone = order.customer && order.customer.phone ? String(order.customer.phone).includes(q) : false;
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    if (orders.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Date,Customer Name,Phone,Email,City,Total (INR),Payment Method,Status\n";

    orders.forEach(o => {
      csvContent += `"${o.orderId}","${o.date}","${o.customer.name}","${o.customer.phone}","${o.customer.email}","${o.customer.city}",${o.grandTotal},"${o.paymentMethod}","${o.status || 'Placed'}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pickel_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', padding: 0 }}>
        
        {/* Header */}
        <div style={{ padding: '1.2rem 1.5rem', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={22} color="var(--color-primary)" />
              <span>Received Orders Dashboard</span>
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
              Manage and track customer orders received on PICKEL
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: '0.75rem', color: '#dc2626', padding: '0.3rem 0.6rem' }} title="Lock Dashboard">
              <Lock size={14} />
              <span>Lock</span>
            </button>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-card-border)', background: '#ffffff', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', gap: '0.8rem', flex: 1, minWidth: '260px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search by Order ID, Name, Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.8rem 0.45rem 2.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.85rem' }}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.45rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-card-border)', fontSize: '0.85rem', fontWeight: 700 }}
            >
              <option value="all">All Statuses</option>
              <option value="Placed">Placed</option>
              <option value="Jarring & Oil">Jarring & Oil</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={handleExportCSV} className="btn btn-outline" style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem' }}>
              <Download size={15} />
              <span>Export CSV</span>
            </button>
            {orders.length > 0 && (
              <button onClick={onClearOrders} className="btn btn-ghost" style={{ padding: '0.45rem 0.8rem', fontSize: '0.825rem', color: '#dc2626' }}>
                <Trash2 size={15} />
                <span>Clear All</span>
              </button>
            )}
          </div>

        </div>

        {/* Orders List Body */}
        <div style={{ padding: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>📦</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.3rem' }}>No Received Orders Yet</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                When customers place orders on your pickle store, they will automatically show up right here in real time!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {filteredOrders.map(order => (
                <div key={order.orderId} style={{ background: '#faf8f5', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-md)', padding: '1.2rem' }}>
                  
                  {/* Order Top Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                        Order ID: {order.orderId}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.8rem' }}>
                        Date: {order.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Status:</span>
                      <select
                        value={order.status || 'Placed'}
                        onChange={(e) => onUpdateOrderStatus(order.orderId, e.target.value)}
                        style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--color-primary)',
                          background: '#ffffff',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          color: 'var(--color-primary)'
                        }}
                      >
                        <option value="Placed">Placed 🟡</option>
                        <option value="Jarring & Oil">Jarring & Oil 🟠</option>
                        <option value="Shipped">Shipped 🚚</option>
                        <option value="Delivered">Delivered 🟢</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Info & Address */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '0.8rem', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                        👤 {order.customer.name}
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Phone size={13} /> <span>{order.customer.phone}</span>
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Mail size={13} /> <span>{order.customer.email}</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={14} color="var(--color-primary)" /> Shipping Destination:
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                        {order.customer.address}, {order.customer.city} - {order.customer.pincode}
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-sm)', padding: '0.8rem', marginBottom: '0.8rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                      Ordered Jars:
                    </div>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                        <span>{item.name} ({item.sizeWeight}) x{item.quantity}</span>
                        <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Paid via: <strong>{order.paymentMethod}</strong>
                    </span>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>Total Received:</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)' }}>₹{order.grandTotal}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


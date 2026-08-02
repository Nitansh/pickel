// Cloud Orders API Service for Cross-Device Synchronization

// Free global cloud KV store endpoint for real-time order sync
const CLOUD_STORAGE_KEY = 'pickel_global_orders_v1';
const API_URL = '/api/orders';

// Fallback cloud store using Pantry / JSONBin / Mock Storage if running locally without backend
const PUBLIC_CLOUD_ENDPOINT = 'https://getpantry.cloud/apiv1/pantry/8e2a1b9c-4f7d-4b8a-9e1d-6c3f2b1a0e9d/basket/pickel_orders';

export async function fetchCloudOrders() {
  try {
    // 1. Try Vercel / Express local API endpoint first
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    // Failover to Public Cloud Endpoint
  }

  try {
    // 2. Try Public Cloud KV Store for instant cross-device sync
    const res = await fetch(PUBLIC_CLOUD_ENDPOINT);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.orders)) {
        return data.orders;
      }
    }
  } catch (err) {
    // Ignore error
  }

  // 3. Fallback to localStorage if offline
  try {
    const local = localStorage.getItem('pickel_received_orders');
    if (local) return JSON.parse(local);
  } catch (e) {}

  return [];
}

export async function saveCloudOrder(newOrder) {
  // First save locally to guarantee instant UI update
  let updatedOrders = [newOrder];
  try {
    const existing = await fetchCloudOrders();
    // Prevent duplicates
    if (!existing.some(o => o.orderId === newOrder.orderId)) {
      updatedOrders = [newOrder, ...existing];
    } else {
      updatedOrders = existing;
    }
  } catch (e) {}

  // 1. Send POST to server API
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
  } catch (err) {}

  // 2. Sync with Public Cloud Endpoint for mobile & cross-laptop sync
  try {
    await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: updatedOrders })
    });
  } catch (err) {}

  // 3. Update localStorage
  try {
    localStorage.setItem('pickel_received_orders', JSON.stringify(updatedOrders));
  } catch (e) {}

  return updatedOrders;
}

export async function updateCloudOrderStatus(orderId, newStatus) {
  let updated = [];
  try {
    const existing = await fetchCloudOrders();
    updated = existing.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    
    // Sync to Public Cloud
    await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: updated })
    });

    localStorage.setItem('pickel_received_orders', JSON.stringify(updated));
  } catch (err) {}

  return updated;
}

export async function clearCloudOrders() {
  try {
    await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: [] })
    });
    localStorage.removeItem('pickel_received_orders');
  } catch (err) {}
  return [];
}

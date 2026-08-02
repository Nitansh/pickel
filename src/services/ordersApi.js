// Cloud Orders API Service for Cross-Device Synchronization

const API_URL = '/api/orders';
const PUBLIC_CLOUD_ENDPOINT = 'https://getpantry.cloud/apiv1/pantry/8e2a1b9c-4f7d-4b8a-9e1d-6c3f2b1a0e9d/basket/pickel_orders';

export async function fetchCloudOrders() {
  // 1. Try server API endpoint (/api/orders) first
  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) {
          try {
            localStorage.setItem('pickel_received_orders', JSON.stringify(data));
          } catch (e) {}
          return data;
        }
      }
    }
  } catch (err) {}

  // 2. Try Public Cloud KV Store if available
  try {
    const res = await fetch(PUBLIC_CLOUD_ENDPOINT);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data && Array.isArray(data.orders)) {
          try {
            localStorage.setItem('pickel_received_orders', JSON.stringify(data.orders));
          } catch (e) {}
          return data.orders;
        }
      }
    }
  } catch (err) {}

  // 3. Fallback to localStorage
  try {
    const local = localStorage.getItem('pickel_received_orders');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}

  return [];
}

export async function saveCloudOrder(newOrder) {
  let existing = [];
  try {
    const local = localStorage.getItem('pickel_received_orders');
    if (local) existing = JSON.parse(local);
  } catch (e) {}

  if (!Array.isArray(existing)) existing = [];

  let updatedOrders = [newOrder];
  const existingIdx = existing.findIndex(o => o.orderId === newOrder.orderId);
  if (existingIdx >= 0) {
    updatedOrders = existing.map(o => o.orderId === newOrder.orderId ? newOrder : o);
  } else {
    updatedOrders = [newOrder, ...existing];
  }

  // Update localStorage immediately
  try {
    localStorage.setItem('pickel_received_orders', JSON.stringify(updatedOrders));
  } catch (e) {}

  // Send POST to server API (/api/orders)
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.orders)) return data.orders;
      }
    }
  } catch (err) {}

  // Sync to Public Cloud if available
  try {
    await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: updatedOrders })
    });
  } catch (err) {}

  return updatedOrders;
}

export async function updateCloudOrderStatus(orderId, newStatus) {
  let existing = [];
  try {
    const local = localStorage.getItem('pickel_received_orders');
    if (local) existing = JSON.parse(local);
  } catch (e) {}

  if (!Array.isArray(existing) || existing.length === 0) {
    existing = await fetchCloudOrders();
  }

  const updated = existing.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);

  // Update localStorage immediately
  try {
    localStorage.setItem('pickel_received_orders', JSON.stringify(updated));
  } catch (e) {}

  // Sync with server API (/api/orders)
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_status', orderId, status: newStatus })
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.orders)) return data.orders;
      }
    }
  } catch (err) {}

  // Sync to Public Cloud if available
  try {
    await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: updated })
    });
  } catch (err) {}

  return updated;
}

export async function clearCloudOrders() {
  try {
    localStorage.removeItem('pickel_received_orders');
  } catch (e) {}

  try {
    await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear' })
    });
  } catch (err) {}

  try {
    await fetch(PUBLIC_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: [] })
    });
  } catch (err) {}

  return [];
}


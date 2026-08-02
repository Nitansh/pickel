// Vercel Serverless Function for Orders API
let memoryOrders = [
  {
    orderId: 'PKL-849201',
    date: '01 Aug 2026',
    items: [
      { name: 'Grandma’s Avakaya Raw Mango', sizeWeight: '250g', quantity: 2, price: 349 }
    ],
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9034716744',
      address: 'Flat 402, Sunshine Heights, MG Road',
      city: 'Bengaluru',
      pincode: '560001'
    },
    paymentMethod: 'UPI (QR Code Scanner)',
    subtotal: 698,
    discount: 70,
    shippingFee: 0,
    grandTotal: 628,
    status: 'Placed'
  }
];

export default function handler(req, res) {
  // Enable CORS for cross-origin mobile apps
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(memoryOrders);
  }

  if (req.method === 'POST') {
    const newOrder = req.body;
    if (newOrder && newOrder.orderId) {
      if (!memoryOrders.some(o => o.orderId === newOrder.orderId)) {
        memoryOrders.unshift(newOrder);
      }
      return res.status(200).json({ success: true, orders: memoryOrders });
    }
    return res.status(400).json({ error: 'Invalid order data' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

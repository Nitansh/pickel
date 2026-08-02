import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const INITIAL_SAMPLE_ORDER = {
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
};

function apiOrdersPlugin() {
  let memoryOrders = [INITIAL_SAMPLE_ORDER];
  return {
    name: 'api-orders-plugin',
    configureServer(server) {
      server.middlewares.use('/api/orders', (req, res) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            return res.end();
          }

          let parsedBody = {};
          try {
            if (body) parsedBody = JSON.parse(body);
          } catch(e) {}

          if (req.method === 'GET') {
            res.statusCode = 200;
            return res.end(JSON.stringify(memoryOrders));
          }

          if (req.method === 'PUT' || (req.method === 'POST' && parsedBody.action === 'update_status')) {
            const { orderId, status } = parsedBody;
            memoryOrders = memoryOrders.map(o => o.orderId === orderId ? { ...o, status } : o);
            res.statusCode = 200;
            return res.end(JSON.stringify(memoryOrders));
          }

          if (req.method === 'DELETE' || (req.method === 'POST' && parsedBody.action === 'clear')) {
            memoryOrders = [];
            res.statusCode = 200;
            return res.end(JSON.stringify(memoryOrders));
          }

          if (req.method === 'POST') {
            if (parsedBody.orderId) {
              const existingIdx = memoryOrders.findIndex(o => o.orderId === parsedBody.orderId);
              if (existingIdx >= 0) {
                memoryOrders[existingIdx] = parsedBody;
              } else {
                memoryOrders.unshift(parsedBody);
              }
              res.statusCode = 200;
              return res.end(JSON.stringify(memoryOrders));
            }
          }

          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Invalid request' }));
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiOrdersPlugin()],
  server: {
    port: 3000,
    open: true
  }
});


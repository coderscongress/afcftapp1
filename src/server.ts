
// server.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import http from 'http'; // ⬅️ Required for Socket.IO
import path from 'path';
import cors from 'cors';
import { Server } from 'socket.io'; // ⬅️ Socket.IO Server
import { socketManager } from './server/socketManager'; // ⬅️ Your custom socket logic

// Your existing imports
import openaiChat from './routes/openaiChat';
import { afcftaProductListings } from './data/AfCFTAProductListings';
import { afcftaVendorListings } from './data/AfCFTAVendorListings';
import { tariffList } from './data/tariffList';

const app = express();
const port = process.env.PORT || 5000;

// Setup HTTP server for both Express and Socket.IO
const server = http.createServer(app);

// Attach Socket.IO to HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
socketManager(io); // 👈 Hook up socket events

// Middleware
app.use(express.json());
app.use(cors());

// --- Your existing REST API routes ---

app.get('/api/search/products', (req: Request, res: Response) => {
  const q = req.query.q?.toString().toLowerCase().trim() || '';
  const filtered = afcftaProductListings.filter(product =>
    product.productName.toLowerCase().includes(q) ||
    product.productCategory.toLowerCase().includes(q) ||
    product.description?.toLowerCase().includes(q) ||
    product.productCode.toLowerCase().includes(q)
  );
  res.json(filtered);
});

app.get('/api/search/vendors', (req: Request, res: Response) => {
  const q = req.query.q?.toString().toLowerCase().trim() || '';
  const results = afcftaVendorListings.filter(vendor =>
    vendor.vendorCompanyName.toLowerCase().includes(q) ||
    vendor.countryOfOrigin.toLowerCase().includes(q) ||
    vendor.description?.toLowerCase().includes(q) ||
    vendor.productCode.toLowerCase().includes(q)
  );
  res.json(results);
});

app.get('/api/search/tariffs', (req: Request, res: Response) => {
  const q = req.query.q?.toString().toLowerCase() || '';
  const results = tariffList.filter(t =>
    t.category.toLowerCase().includes(q) ||
    t.rate.toString().includes(q) ||
    q.includes('duty') ||
    q.includes('tariff') ||
    t.keywords?.some((k: string) => k.toLowerCase().includes(q))
  );
  res.json(results);
});

// OpenAI chat route
app.use('/api/openai', openaiChat);

// Optional: Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'frontend');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// ✅ Unified server for REST + WebSocket
server.listen(port, () => {
  console.log(`🚀 AfCFTApp server running at http://localhost:${port}`);
});

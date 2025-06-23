
//server.ts

import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import path from 'path';
import openaiChat from './routes/openaiChat';
import cors from 'cors';
import { productList } from './data/productList';
import { tariffList } from './data/tariffList';
import { afcftaProductListings } from './data/AfCFTAProductListings';
import { afcftaVendorListings } from './data/AfCFTAVendorListings';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ✅ Define API routes BEFORE static files and wildcard

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


app.use('/api/openai', openaiChat);

// Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'frontend');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}


// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
    process.exit(1);
  } else {
    throw err;
  }
});

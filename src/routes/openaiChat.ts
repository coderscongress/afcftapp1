// src/routes/openaiChat.ts

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { OpenAI } from 'openai';
import { Request, Response } from 'express';
import { afcftaProductListings } from "../data/AfCFTAProductListings";
import { afcftaVendorListings } from "../data/AfCFTAVendorListings";

type Vendor = typeof afcftaVendorListings[number]; // inferred type

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ reply: '❗ Message is required' });
      return;
    }

    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("list products")) {
      const products = afcftaProductListings
        .map(p => `${p.productName} (${p.productCode})`)
        .join("\n");

      res.json({ reply: `Here are some AfCFTA products:\n\n${products}` });
      return;
    }

    if (lowerMsg.includes("vendor for")) {
      const productMatch = afcftaProductListings.find(p =>
        lowerMsg.includes(p.productName.toLowerCase())
      );

      if (productMatch) {
  const vendors: Vendor[] = afcftaVendorListings.filter(
    (v): v is Vendor =>
      v !== undefined && v.productCode === productMatch.productCode
  );

  const vendorList = vendors
    .map(v => `${v?.vendorCompanyName} - ${v?.countryOfOrigin}`)
    .join("\n");

  res.json({ reply: `Vendors for ${productMatch.productName}:\n\n${vendorList}` });
  return;
}
 else {
        res.json({ reply: "Sorry, I couldn't find that product in our listings." });
      }
      return;
    }

    // Fallback for unmatched prompts
    res.json({
      reply: "I'm a local development bot. Try asking for 'list products' or 'vendor for [product]'."
    });

  } catch (err) {
    console.error("Local chatbot error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

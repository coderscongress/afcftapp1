"use strict";
// src/routes/openaiChat.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
const AfCFTAProductListings_1 = require("../data/AfCFTAProductListings");
const AfCFTAVendorListings_1 = require("../data/AfCFTAVendorListings");
const router = express_1.default.Router();
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            res.status(400).json({ reply: '❗ Message is required' });
            return;
        }
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes("list products")) {
            const products = AfCFTAProductListings_1.afcftaProductListings
                .map(p => `${p.productName} (${p.productCode})`)
                .join("\n");
            res.json({ reply: `Here are some AfCFTA products:\n\n${products}` });
            return;
        }
        if (lowerMsg.includes("vendor for")) {
            const productMatch = AfCFTAProductListings_1.afcftaProductListings.find(p => lowerMsg.includes(p.productName.toLowerCase()));
            if (productMatch) {
                const vendors = AfCFTAVendorListings_1.afcftaVendorListings.filter((v) => v !== undefined && v.productCode === productMatch.productCode);
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
    }
    catch (err) {
        console.error("Local chatbot error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;

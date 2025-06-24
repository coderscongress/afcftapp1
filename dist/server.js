"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http")); // ⬅️ Required for Socket.IO
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io"); // ⬅️ Socket.IO Server
const socketManager_1 = require("./server/socketManager"); // ⬅️ Your custom socket logic
// Your existing imports
const openaiChat_1 = __importDefault(require("./routes/openaiChat"));
const AfCFTAProductListings_1 = require("./data/AfCFTAProductListings");
const AfCFTAVendorListings_1 = require("./data/AfCFTAVendorListings");
const tariffList_1 = require("./data/tariffList");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Setup HTTP server for both Express and Socket.IO
const server = http_1.default.createServer(app);
// Attach Socket.IO to HTTP server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
(0, socketManager_1.socketManager)(io); // 👈 Hook up socket events
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// --- Your existing REST API routes ---
app.get('/api/search/products', (req, res) => {
    const q = req.query.q?.toString().toLowerCase().trim() || '';
    const filtered = AfCFTAProductListings_1.afcftaProductListings.filter(product => product.productName.toLowerCase().includes(q) ||
        product.productCategory.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q) ||
        product.productCode.toLowerCase().includes(q));
    res.json(filtered);
});
app.get('/api/search/vendors', (req, res) => {
    const q = req.query.q?.toString().toLowerCase().trim() || '';
    const results = AfCFTAVendorListings_1.afcftaVendorListings.filter(vendor => vendor.vendorCompanyName.toLowerCase().includes(q) ||
        vendor.countryOfOrigin.toLowerCase().includes(q) ||
        vendor.description?.toLowerCase().includes(q) ||
        vendor.productCode.toLowerCase().includes(q));
    res.json(results);
});
app.get('/api/search/tariffs', (req, res) => {
    const q = req.query.q?.toString().toLowerCase() || '';
    const results = tariffList_1.tariffList.filter(t => t.category.toLowerCase().includes(q) ||
        t.rate.toString().includes(q) ||
        q.includes('duty') ||
        q.includes('tariff') ||
        t.keywords?.some((k) => k.toLowerCase().includes(q)));
    res.json(results);
});
// OpenAI chat route
app.use('/api/openai', openaiChat_1.default);
// Optional: Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path_1.default.join(__dirname, '..', 'frontend');
    app.use(express_1.default.static(clientBuildPath));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(clientBuildPath, 'index.html'));
    });
}
// ✅ Unified server for REST + WebSocket
server.listen(port, () => {
    console.log(`🚀 AfCFTApp server running at http://localhost:${port}`);
});

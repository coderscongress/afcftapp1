"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// src/index.tsx
require("./i18n"); // <-- Important: this initializes i18next
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Serve static React files
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
// All other routes return index.html to support React Router
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

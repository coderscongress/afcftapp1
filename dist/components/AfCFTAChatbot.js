"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
//AfCFTAChatbot.tsx
const i18next_1 = __importDefault(require("i18next"));
require("../i18n"); // <-- Important: this initializes i18next
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_i18next_1 = require("react-i18next");
const AfCFTAProductListings_1 = require("../data/AfCFTAProductListings");
const AfCFTAVendorListings_1 = require("../data/AfCFTAVendorListings");
const productList_1 = require("../data/productList");
require("./AfCFTAChatbot.css");
const AfCFTAChatbot = () => {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [input, setInput] = (0, react_1.useState)('');
    const { t } = (0, react_i18next_1.useTranslation)();
    (0, react_1.useEffect)(() => {
        const saved = localStorage.getItem('afcfta-chat');
        if (saved)
            setMessages(JSON.parse(saved));
    }, []);
    (0, react_1.useEffect)(() => {
        localStorage.setItem('afcfta-chat', JSON.stringify(messages));
    }, [messages]);
    const safeJson = async (res) => {
        const text = await res.text();
        try {
            return JSON.parse(text);
        }
        catch {
            throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
        }
    };
    const fetchTariffSearch = async (query) => {
        try {
            const res = await fetch(`/api/search/tariffs?q=${encodeURIComponent(query)}`);
            const data = await safeJson(res);
            if (!data.length)
                return t('noTariffsFound');
            return `${t('tariffs')}:\n${data.map((d) => `- ${d.category}: ${d.rate}%`).join('\n')}`;
        }
        catch (err) {
            console.error('Tariff search error:', err);
            return t('tariffSearchError');
        }
    };
    const fetchVendorSearch = async (query) => {
        const loweredQuery = query.toLowerCase().replace('vendor for', '').replace('vendors for', '').trim();
        // Try to find vendors whose productCode or description or company name loosely matches the query
        const matchedVendors = AfCFTAVendorListings_1.afcftaVendorListings.filter((vendor) => vendor !== undefined &&
            (vendor.vendorCompanyName.toLowerCase().includes(loweredQuery) ||
                vendor.description?.toLowerCase().includes(loweredQuery) ||
                vendor.productCode.toLowerCase().includes(loweredQuery)));
        if (matchedVendors.length === 0) {
            return `❌ ${t('noVendorsFound')} "${loweredQuery}".`;
        }
        // Create a readable vendor listing string
        const result = matchedVendors.map(v => {
            return `🏢 ${v.vendorCompanyName} (${v.countryOfOrigin})
📦 ${t('maxStock')}: ${v.stockQuantityMax} ${v.productUnit}
💰 ${t('price')}: ${v.unitPrice.toLocaleString()} ${v.currencyCode}
📞 ${t('contact')}: ${v.phoneNumber}
📧 ${t('email')}: ${v.email}
🚚 ${t('delivery')}: ~${v.estimatedDeliveryTimeInDays} ${t('days')}
✅ ${t('compliant')}: ${v.afcftaRulesOfOriginCompliant ? t('yes') : t('no')}
📍 ${t('ports')}: ${v.availablePorts?.join(', ') || 'N/A'}
`;
        }).join('\n');
        return `🔎 ${t('vendorsFor')} "${loweredQuery}":\n\n${result}`;
    };
    const fetchProductSearch = async (query) => {
        const loweredQuery = query.toLowerCase().replace('find product', '').replace('search product', '').trim();
        const matchedProducts = AfCFTAProductListings_1.afcftaProductListings.filter(product => product.productName.toLowerCase().includes(loweredQuery) ||
            product.productCategory.toLowerCase().includes(loweredQuery) ||
            product.description?.toLowerCase().includes(loweredQuery) ||
            product.productCode.toLowerCase().includes(loweredQuery));
        if (matchedProducts.length === 0) {
            return `❌ ${t('noProductsFound')} "${loweredQuery}".`;
        }
        const result = matchedProducts.map(p => {
            return `🛍️ ${p.productName} (${p.productCategory})
🔢 ${t('code')}: ${p.productCode}
📝 ${p.description || t('noDescription')}
`;
        }).join('\n');
        return `📦 ${t('productsMatching')} "${loweredQuery}":\n\n${result}`;
    };
    const sendMessageToOpenAI = async (input) => {
        try {
            const res = await axios_1.default.post('/api/openai', { message: input });
            return res.data.reply;
        }
        catch (err) {
            console.error('OpenAI API error:', err);
            return '⚠️ OpenAI chatbot failed to respond.';
        }
    };
    // Keyword normalization map
    const keywordMap = {
        'trouvez': 'find',
        'chercher': 'find',
        'produit': 'product',
        'produits': 'products',
        'vendeur': 'vendor',
        'vendeurs': 'vendors',
        'taux': 'rate',
        'droits': 'duty',
        'tarif': 'tariff',
        'tarifs': 'tariffs'
    };
    const normalizeInput = (input) => {
        return input
            .split(' ')
            .map(word => keywordMap[word.toLowerCase()] || word)
            .join(' ');
    };
    const processMessage = async (input) => {
        const normalized = normalizeInput(input);
        const lowerInput = normalized.toLowerCase();
        const productNames = productList_1.productList.map(p => p.name.toLowerCase());
        const isProductQuery = lowerInput.includes('product') ||
            lowerInput.includes('find') ||
            productNames.some(name => lowerInput.includes(name));
        const isTariffQuery = lowerInput.includes('tariff') ||
            lowerInput.includes('duty') ||
            lowerInput.includes('rate');
        const isVendorQuery = lowerInput.includes('vendor for') || lowerInput.includes('vendors for');
        if (isProductQuery) {
            return await fetchProductSearch(input);
        }
        if (isTariffQuery) {
            return await fetchTariffSearch(input);
        }
        if (isVendorQuery) {
            return await fetchVendorSearch(input); // You define this function
        }
        if (lowerInput.includes('product') || lowerInput.includes('find product') || lowerInput.includes('search product')) {
            return await fetchProductSearch(input);
        }
        try {
            const res = await axios_1.default.post('/api/openai', { message: input });
            return res.data.reply;
        }
        catch (err) {
            console.error('Chatbot error:', err);
            return t('chatbotError');
        }
    };
    const sendMessage = async () => {
        if (!input.trim())
            return;
        const userMsg = `👤 ${input}`;
        setMessages(prev => [...prev, userMsg]);
        const reply = await processMessage(input);
        setMessages(prev => [...prev, `🤖 ${reply}`]);
        setInput('');
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            sendMessage();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "chatbot-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chatbot-header", children: [(0, jsx_runtime_1.jsx)("h3", { children: t('chatbotTitle') }), (0, jsx_runtime_1.jsxs)("select", { onChange: (e) => i18next_1.default.changeLanguage(e.target.value), defaultValue: i18next_1.default.language, children: [(0, jsx_runtime_1.jsx)("option", { value: "en", children: "\uD83C\uDDEC\uD83C\uDDE7 English" }), (0, jsx_runtime_1.jsx)("option", { value: "fr", children: "\uD83C\uDDEB\uD83C\uDDF7 French" }), (0, jsx_runtime_1.jsx)("option", { value: "sw", children: "\uD83C\uDF0D Swahili" }), (0, jsx_runtime_1.jsx)("option", { value: "yo", children: "\uD83D\uDDE3\uFE0F Yoruba" }), (0, jsx_runtime_1.jsx)("option", { value: "ha", children: "\uD83D\uDDE3\uFE0F Hausa" }), (0, jsx_runtime_1.jsx)("option", { value: "tw", children: "\uD83D\uDDE3\uFE0F Twi" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "chatbot-messages", children: messages.map((msg, idx) => ((0, jsx_runtime_1.jsx)("div", { className: "chatbot-msg", children: msg }, idx))) }), (0, jsx_runtime_1.jsxs)("div", { className: "chatbot-input", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: t('placeholder') }), (0, jsx_runtime_1.jsxs)("div", { className: "chatbot-buttons", children: [(0, jsx_runtime_1.jsx)("button", { onClick: sendMessage, children: t('send') }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setMessages([]), children: t('clear') }), (0, jsx_runtime_1.jsx)("button", { onClick: () => i18next_1.default.changeLanguage(i18next_1.default.language === 'en' ? 'fr' : 'en'), children: i18next_1.default.language === 'en' ? '🇫🇷 Français' : '🇬🇧 English' })] })] })] }));
};
exports.default = AfCFTAChatbot;

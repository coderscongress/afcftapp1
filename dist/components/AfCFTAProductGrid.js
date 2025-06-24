"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const productService_1 = require("../services/productService");
require("./AfCFTAProductGrid.css");
const AfCFTAProductGrid = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        (0, productService_1.getAfCFTAProducts)()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);
    if (loading)
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading AfCFTA products..." });
    return ((0, jsx_runtime_1.jsx)("div", { className: "afcfta-grid", children: products.map((product) => ((0, jsx_runtime_1.jsxs)("div", { className: "afcfta-card", children: [(0, jsx_runtime_1.jsx)("img", { src: product.productImageUrl, alt: product.productName }), (0, jsx_runtime_1.jsx)("h3", { children: product.productName }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Country:" }), " ", product.countryOfOrigin] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Price:" }), " ", product.unitPrice, " ", product.currencyCode, "/", product.unit] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Stock:" }), " ", product.stockQuantity] }), (0, jsx_runtime_1.jsx)("a", { href: `https://wa.me/${product.WhatsApp}`, target: "_blank", rel: "noopener noreferrer", children: "WhatsApp Vendor" })] }, product.id))) }));
};
exports.default = AfCFTAProductGrid;

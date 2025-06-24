"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AfCFTAProductListings_1 = require("../data/AfCFTAProductListings");
const AfCFTAProductList = () => {
    return ((0, jsx_runtime_1.jsx)("div", { children: AfCFTAProductListings_1.afcftaProductListings.map((product) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/product/${product.id}`, children: (0, jsx_runtime_1.jsx)("h2", { children: product.productName }) }), (0, jsx_runtime_1.jsx)("p", { children: product.description })] }, product.id))) }));
};
exports.default = AfCFTAProductList;

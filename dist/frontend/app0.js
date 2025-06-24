"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// src/frontend/app.tsx  
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const AfCFTABuyerOrder_1 = __importDefault(require("../components/AfCFTABuyerOrder"));
const NotFound_1 = __importDefault(require("../components/NotFound"));
const AfCFTAProductDetail_1 = __importDefault(require("../components/AfCFTAProductDetail"));
const AfCFTAVendorDetail_1 = __importDefault(require("../components/AfCFTAVendorDetail"));
const AfCFTARegionalOpportunities_1 = __importDefault(require("../components/AfCFTARegionalOpportunities"));
const AfCFTAOrderForm_1 = __importDefault(require("../components/AfCFTAOrderForm"));
const AfCFTAProductGrid_1 = __importDefault(require("../components/AfCFTAProductGrid"));
const AfCFTAProductList_1 = __importDefault(require("../components/AfCFTAProductList"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)("div", { children: "Welcome to AfCFTA App!!!" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/buyer-order/:productCode", element: (0, jsx_runtime_1.jsx)(AfCFTABuyerOrder_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/product-detail/:productCode", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAProductDetail_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor-detail/:vendorCode", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAVendorDetail_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/afcfta-tips", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTARegionalOpportunities_1.default, { productCategory: "All", userCountry: "Ghana" }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/afcfta-orderform", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAOrderForm_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/productgrid", element: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(AfCFTAProductGrid_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/product-list", element: (0, jsx_runtime_1.jsx)(AfCFTAProductList_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(NotFound_1.default, {}) }), "  "] }) }));
};
exports.default = App;

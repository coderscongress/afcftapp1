"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const vendors = [
    { id: '1', name: 'Exporter Inc.', country: 'Nigeria', whatsapp: '+2348001234567' },
    // More vendors...
];
const AfCFTAVendorList = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "vendor-list", children: [(0, jsx_runtime_1.jsx)("h1", { children: "AfCFTA Vendors" }), (0, jsx_runtime_1.jsx)("ul", { children: vendors.map(vendor => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/vendor/${vendor.id}`, children: [(0, jsx_runtime_1.jsx)("h3", { children: vendor.name }), (0, jsx_runtime_1.jsx)("p", { children: vendor.country })] }) }, vendor.id))) })] }));
};
exports.default = AfCFTAVendorList;

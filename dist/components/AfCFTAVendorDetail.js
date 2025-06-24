"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const AfCFTAVendorListings_1 = require("../data/AfCFTAVendorListings");
require("./AfCFTAVendorDetail.css");
const AfCFTAVendorDetail = () => {
    const { vendorCode } = (0, react_router_dom_1.useParams)();
    const [product, setProduct] = (0, react_1.useState)(null);
    const [vendor, setVendor] = (0, react_1.useState)([]);
    const [buyerEmail, setBuyerEmail] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const matchingVendors = AfCFTAVendorListings_1.afcftaVendorListings.filter(v => v?.vendorCode === vendorCode); // for mulitiple vendor matches [paginate ...]
        setVendor(matchingVendors);
    }, [vendorCode]);
    const handleWhatsAppOrder = (v) => {
        const message = `Hello, I would like to order:\n\nProduct: ${v.productCode}\nPrice: ${v.currencyCode}${v.unitPrice}\n\nPlease confirm availability.`;
        const phone = v.phoneNumber || '';
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };
    const handleEmailOrder = (v) => {
        if (!buyerEmail)
            return;
        const subject = `Order Inquiry: ${v.vendorCompanyName}`;
        const body = `Dear ${v.vendorCompanyName},\n\nI would like to order the following product:\n\nProduct: ${v.productCode}\nPrice: ${v.currencyCode}${v.unitPrice}\n\nPlease respond to this email to confirm availability.\n\nBest regards,\n${buyerEmail}`;
        const email = v.email || '';
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
    };
    if (!vendor)
        return (0, jsx_runtime_1.jsx)("div", { className: "afcfta-vendor-detail", children: "Vendor not found." });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "afcfta-vendor-detail", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                    const html = document.documentElement;
                    const current = html.getAttribute('data-theme');
                    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
                }, children: "Toggle Theme" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => navigate(-1), className: "afcfta-back-button", children: "\u2190 Back to Listings" }), (0, jsx_runtime_1.jsx)("div", { className: "afcfta-vendor-content", children: (0, jsx_runtime_1.jsx)("ul", { children: vendor.map(v => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("img", { src: v.productImageUrl, alt: v.productCode, className: "afcfta-vendor-image" }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-vendor-info", children: [(0, jsx_runtime_1.jsx)("h1", { className: "afcfta-vendor-title", children: v.vendorCompanyName }), (0, jsx_runtime_1.jsx)("p", { className: "afcfta-vendor-description", children: v.description }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-vendor-price", children: ["Price per ", v.productUnit, ": ", v.currencyCode, v.unitPrice] }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-vendor-info", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Vendor Information" }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Vendor Company Name:" }), " ", v.vendorCompanyName] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Product Description:" }), " ", v.description] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Country of origin:" }), " ", v.countryOfOrigin] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Phone:" }), " ", v.phoneNumber] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Email:" }), " ", v.email] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-order-section", children: [(0, jsx_runtime_1.jsx)("button", { className: "afcfta-order-button", onClick: () => handleWhatsAppOrder(v), children: "Order via WhatsApp" }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-email-order", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Enter your email to order by email", value: buyerEmail, onChange: (e) => setBuyerEmail(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleEmailOrder(v), children: "Order via Email" })] })] })] })] }, v.id))) }) })] }));
};
exports.default = AfCFTAVendorDetail;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./AfCFTABuyerOrder.css");
const AfCFTABuyerListings_1 = require("../data/AfCFTABuyerListings");
const AfCFTAVendorListings_1 = require("../data/AfCFTAVendorListings");
const AfCFTABuyerOrder = () => {
    const { productCode } = (0, react_router_dom_1.useParams)();
    if (!productCode) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Product code is missing from URL." });
    }
    const buyer = AfCFTABuyerListings_1.afcftaBuyerListings.find(b => b.productCode === productCode);
    if (!buyer) {
        return (0, jsx_runtime_1.jsxs)("div", { children: ["Buyer not found for product code: ", productCode] });
    }
    const vendor = AfCFTAVendorListings_1.afcftaVendorListings.find(v => v?.productCode === productCode);
    if (!vendor) {
        return (0, jsx_runtime_1.jsxs)("div", { children: ["Vendor not found for product code: ", productCode] });
    }
    const handleOrder = () => {
        const orderMessage = `
AfCFTA Order Request
----------------------------
📦 Product: ${productCode}
🏭 Vendor: ${vendor.vendorCompanyName}
📍 Origin: ${vendor.countryOfOrigin}
💼 Buyer: ${buyer.buyerCompanyName}
🌍 Buyer Country: ${buyer.buyerCountry}
📦 Quantity: ${buyer.quantity}
🚚 Shipping Required: ${vendor.shippingRequired ? 'Yes' : 'No'}
💵 Currency: ${buyer.currencyCode}
📄 Trade Docs: ${buyer.tradeDocumentsAvailable ? 'Available' : 'Not Available'}
🛤️ Transport Modes: ${buyer.transportMode.join(', ')}
🧾 Payment Terms: ${buyer.paymentTerms}
⚓ Ports: ${vendor.availablePorts.join(', ')}

Let's proceed with the trade under AfCFTA.
    `.trim();
        if (buyer.WhatsApp) {
            const waLink = `https://wa.me/${buyer.WhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(orderMessage)}`;
            window.open(waLink, '_blank');
        }
        else if (buyer.Email) {
            const mailto = `mailto:${buyer.Email}?subject=AfCFTA Order for ${productCode}&body=${encodeURIComponent(orderMessage)}`;
            window.open(mailto, '_blank');
        }
        else {
            alert("No contact method available.");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "order-container", children: [(0, jsx_runtime_1.jsxs)("h3", { children: ["Place Order for: ", (0, jsx_runtime_1.jsx)("span", { className: "highlight", children: productCode })] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Product Description:" }), " ", vendor.description] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Buyer:" }), " ", buyer.buyerCompanyName, " (", buyer.buyerCountry, ")"] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Quantity:" }), " ", buyer.quantity] }), (0, jsx_runtime_1.jsxs)("button", { className: "order-button", onClick: handleOrder, children: ["Contact via ", buyer.WhatsApp ? 'WhatsApp' : 'Email'] })] }));
};
exports.default = AfCFTABuyerOrder;

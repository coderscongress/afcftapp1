"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const jspdf_1 = require("jspdf");
const AfCFTAProductListings_1 = require("../data/AfCFTAProductListings");
const AfCFTAVendorListings_1 = require("../data/AfCFTAVendorListings");
require("./AfCFTAProductDetail.css");
const AfCFTAProductDetail = () => {
    const { productCode } = (0, react_router_dom_1.useParams)();
    const [product, setProduct] = (0, react_1.useState)(null);
    const [vendor, setVendor] = (0, react_1.useState)(null);
    const [buyerEmail, setBuyerEmail] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const foundProduct = AfCFTAProductListings_1.afcftaProductListings.find(p => p.productCode === productCode);
        setProduct(foundProduct || null);
        const foundVendor = AfCFTAVendorListings_1.afcftaVendorListings.find(v => v?.productCode === productCode);
        setVendor(foundVendor || null);
    }, [productCode]);
    const handleWhatsAppOrder = () => {
        if (!product)
            return;
        const message = `Hello, I would like to order:\n\nProduct: ${product.productName}\nPrice: $${product.unitPrice}\n\nPlease confirm availability.`;
        const phone = vendor.phoneNumber || '';
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };
    const handleEmailOrder = () => {
        if (!product || !buyerEmail)
            return;
        const subject = `Order Inquiry: ${product.name}`;
        const body = `Dear ${product.vendor?.name || 'Vendor'},\n\nI would like to order the following product:\n\nProduct: ${product.name}\nPrice: $${product.unitPrice}\n\nPlease respond to this email to confirm availability.\n\nBest regards,\n${buyerEmail}`;
        const email = vendor.email || '';
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
    };
    const generateReceiptText = () => {
        return `ORDER RECEIPT

Product: ${product.name}
Description: ${product.description}
Price: $${product.price}

Vendor: ${product.vendor?.name}
Location: ${product.vendor?.location}
Phone: ${product.vendor?.phone}
Email: ${product.vendor?.email}

Buyer Email: ${buyerEmail || 'Not Provided'}
Date: ${new Date().toLocaleString()}
`;
    };
    const downloadTxtReceipt = () => {
        const text = generateReceiptText();
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${product.name.replace(/\s+/g, '_')}_receipt.txt`;
        link.click();
    };
    const downloadPdfReceipt = () => {
        const doc = new jspdf_1.jsPDF();
        const text = generateReceiptText().split('\n');
        let y = 10;
        text.forEach(line => {
            doc.text(line, 10, y);
            y += 10;
        });
        doc.save(`${product.name.replace(/\s+/g, '_')}_receipt.pdf`);
    };
    if (!product)
        return (0, jsx_runtime_1.jsx)("div", { className: "afcfta-product-detail", children: "Product not found." });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "afcfta-product-detail", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                    const html = document.documentElement;
                    const current = html.getAttribute('data-theme');
                    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
                }, children: "Toggle Theme" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => navigate(-1), className: "afcfta-back-button", children: "\u2190 Back to Listings" }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-product-content", children: [(0, jsx_runtime_1.jsx)("img", { src: vendor.productImageUrl, alt: product.productName, className: "afcfta-product-image" }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-product-info", children: [(0, jsx_runtime_1.jsx)("h1", { className: "afcfta-product-title", children: product.productName }), (0, jsx_runtime_1.jsx)("p", { className: "afcfta-product-description", children: product.description }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-product-price", children: ["Price per ", vendor.productUnit, " : ", vendor.currencyCode, vendor.unitPrice] }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-vendor-info", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Vendor Information" }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Vendor Company Name:" }), " ", vendor.vendorCompanyName] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Product Descrition:" }), " ", vendor.description] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Country of origin:" }), " ", vendor.countryOfOrigin] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Phone:" }), " ", vendor.phoneNumber] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Email:" }), " ", vendor.email] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-order-section", children: [(0, jsx_runtime_1.jsx)("button", { className: "afcfta-order-button", onClick: handleWhatsAppOrder, children: "Order via WhatsApp" }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-email-order", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Enter your email to order by email", value: buyerEmail, onChange: (e) => setBuyerEmail(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleEmailOrder, children: "Order via Email" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "afcfta-receipt-buttons", children: [(0, jsx_runtime_1.jsx)("button", { onClick: downloadTxtReceipt, children: "Download TXT Receipt" }), (0, jsx_runtime_1.jsx)("button", { onClick: downloadPdfReceipt, children: "Download PDF Receipt" })] })] })] })] })] }));
};
exports.default = AfCFTAProductDetail;

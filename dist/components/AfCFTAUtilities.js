"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const pdfGenerator_1 = require("../utils/pdfGenerator");
const sampleProduct = {
    productCode: 'GH-Cocoa-1000',
    vendorCode: 'AfCFTA-VC-10000000',
    vendorCompanyName: 'Akuaba Traders',
    countryOfOrigin: 'Ghana',
    stockQuantityMax: 1000,
    shippingRequired: true,
    description: 'Premium grade cocoa beans sourced from certified farms.',
    WhatsApp: '+233558357115',
    email: 'vendor@example.com',
    phoneNumber: '+233558357115',
    website: '',
    socialMedia: [{ facebook: '' }, { youtube: '' }],
    currencyCode: 'GHS',
    unitPrice: 1000000,
    estimatedDeliveryTimeInDays: 7,
    vendorTIN: 'GH-EXP-0012345',
    tradeDocumentsAvailable: true,
    buyerCountriesAllowed: ['Nigeria', 'Côte d’Ivoire', 'South Africa'],
    transportMode: ['Sea', 'Road'],
    paymentTerms: 'LC/TT/Negotiable',
    productUnit: 'Metric Ton',
    productImageUrl: '/AfCFTAProducts/imageUrl/sisalfibre.jpg',
    afcftaRulesOfOriginCompliant: true,
    minimumQuantityAllowed: 200,
    maximumQuantityAllowed: 20000,
    hsCode: '187000',
    afcftaTariffRate: 0.1,
    afcftaEligible: true,
    regulatoryCertifications: ['COO', 'Phytosanitary'],
    supportedLanguages: ['en', 'fr'],
    availablePorts: ['Tema Port'],
    afcftaID: '12345677899',
    vendorLogoUrl: '/vendorlogourl.jpg',
    productQrCodeUrl: '/productqrcodeurl.jpg',
    productBarCodeUrl: '/productbarcodeurl.jpg',
    productDetails: '',
};
const AfCFTAUtilities = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '20px' }, children: [(0, jsx_runtime_1.jsx)("h2", { children: "AfCFTA Utility Tools" }), (0, jsx_runtime_1.jsx)("button", { onClick: pdfGenerator_1.generateAfCFTACorporateForm, children: "\uD83D\uDCC4 Generate Corporate Form" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("button", { onClick: () => (0, pdfGenerator_1.generateProductSummaryPDF)(sampleProduct), children: "\uD83E\uDDFE Generate Sample Product Summary" })] }));
};
exports.default = AfCFTAUtilities;

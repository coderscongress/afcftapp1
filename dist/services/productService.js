"use strict";
// services/productService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleProducts = void 0;
exports.getAllProducts = getAllProducts;
exports.getAfCFTAProducts = getAfCFTAProducts;
exports.sampleProducts = [
    {
        id: 1,
        productName: 'Cocoa Beans',
        productType: 'Agriculture',
        unit: 'Metric Ton',
        stockQuantity: 1000,
        shippingRequired: true,
        description: 'High-quality Ghanaian cocoa',
        unitPrice: 100,
        productImageUrl: '/AfCFTAProducts/cocoa.jpg',
        fileDownloadUrl: '/product/downloads/cocoa-docs',
        countryOfOrigin: 'Ghana',
        currencyCode: 'GHS',
        rulesOfOriginCompliant: true,
        minimumQuantityAllowed: 200,
        maximumQuantityAllowed: 20000,
        hsCode: '180100',
        afcftaTariffRate: 0,
        afcftaEligible: true,
        regulatoryCertifications: ['FDA Approved'],
        vendorCompanyName: 'Ghana Cocoa Board',
        WhatsApp: '+233558357115',
        phoneNumber: '+233558357115',
    },
];
async function getAllProducts() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
    return await response.json();
}
async function getAfCFTAProducts() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
    if (!res.ok)
        throw new Error('Failed to fetch products');
    return res.json();
}
function isAfCFTAProduct(obj) {
    return 'id' in obj && 'productName' in obj;
}

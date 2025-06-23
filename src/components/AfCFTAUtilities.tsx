import React from 'react';
import { generateAfCFTACorporateForm, generateProductSummaryPDF } from '../utils/pdfGenerator';

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
  return (
    <div style={{ padding: '20px' }}>
      <h2>AfCFTA Utility Tools</h2>
      <button onClick={generateAfCFTACorporateForm}>
        📄 Generate Corporate Form
      </button>

      <br /><br />

      <button onClick={() => generateProductSummaryPDF(sampleProduct)}>
        🧾 Generate Sample Product Summary
      </button>
    </div>
  );
};

export default AfCFTAUtilities;

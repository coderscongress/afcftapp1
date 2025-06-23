

// types/AfCFTAVendor.ts
export interface AfCFTAVendor {
  id: number;
  productCode: string;
  vendorCode: string;
  vendorCompanyName: string;
  countryOfOrigin: string;
  stockQuantityMax: number;
  shippingRequired: boolean;
  description: string;
  WhatsApp: string;
  email: string;
  phoneNumber: string;
  website: string;
  socialMedia: Array<{
    facebook?: string;
    youtube?: string;
    X?: string;
    tiktok?: string;
    linkedin?: string;
    reddit?: string;
  }>;
  currencyCode: string;
  unitPrice: number;
  estimatedDeliveryTimeInDays: number;
  vendorTIN: string;
  tradeDocumentsAvailable: boolean;
  buyerCountriesAllowed: string[];
  transportMode: string[];
  paymentTerms: string;
  productUnit: string;
  productImageUrl: string;
  afcftaRulesOfOriginCompliant: boolean;
  minimumQuantityAllowed: number;
  maximumQuantityAllowed: number;
  hsCode: string;
  afcftaTariffRate: number;
  afcftaEligible: boolean;
  regulatoryCertifications: string[];
  supportedLanguages: string[];
  availablePorts: string[];
  afcftaID: string;
  vendorLogoUrl: string;
  productQrCodeUrl: string;
  productBarCodeUrl: string;
  productDetails: string;
}
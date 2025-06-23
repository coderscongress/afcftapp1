



// services/productService.ts

export interface AfCFTAProduct {
  id: number;
  productName: string;
  productType: string;
  unit: string;
  stockQuantity: number;
  shippingRequired: boolean;
  description: string;
  unitPrice: number;
  productImageUrl: string;
  fileDownloadUrl: string;
  countryOfOrigin: string;
  currencyCode: string;
  rulesOfOriginCompliant: boolean;
  minimumQuantityAllowed: number;
  maximumQuantityAllowed: number;
  hsCode: string;
  afcftaTariffRate: number;
  afcftaEligible: boolean;
  regulatoryCertifications: string[];
  vendorCompanyName: string;
  WhatsApp: string;
  phoneNumber: string;
}


export const sampleProducts: AfCFTAProduct[] = [
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

export async function getAllProducts(): Promise<AfCFTAProduct[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  return await response.json();
}

export async function getAfCFTAProducts(): Promise<AfCFTAProduct[]> {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

function isAfCFTAProduct(obj: any): obj is AfCFTAProduct {
  return 'id' in obj && 'productName' in obj;
}
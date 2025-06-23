import React from 'react';
import { useParams } from 'react-router-dom';
import './AfCFTABuyerOrder.css';
import { afcftaBuyerListings } from '../data/AfCFTABuyerListings';
import { afcftaVendorListings } from '../data/AfCFTAVendorListings';
import { debounce } from 'lodash';

const AfCFTABuyerOrder: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();

  if (!productCode) {
    return <div>Product code is missing from URL.</div>;
  }

  const buyer = afcftaBuyerListings.find(b => b.productCode === productCode);
  if (!buyer) {
    return <div>Buyer not found for product code: {productCode}</div>;
  }

  const vendor = afcftaVendorListings.find(v => v?.productCode === productCode);
  if (!vendor) {
    return <div>Vendor not found for product code: {productCode}</div>;
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
    } else if (buyer.Email) {
      const mailto = `mailto:${buyer.Email}?subject=AfCFTA Order for ${productCode}&body=${encodeURIComponent(orderMessage)}`;
      window.open(mailto, '_blank');
    } else {
      alert("No contact method available.");
    }
  };

  return (
    <div className="order-container">
      <h3>Place Order for: <span className="highlight">{productCode}</span></h3>
      <p><strong>Product Description:</strong> {vendor.description}</p>
      <p><strong>Buyer:</strong> {buyer.buyerCompanyName} ({buyer.buyerCountry})</p>
      <p><strong>Quantity:</strong> {buyer.quantity}</p>
      <button className="order-button" onClick={handleOrder}>
        Contact via {buyer.WhatsApp ? 'WhatsApp' : 'Email'}
      </button>
    </div>
  );
};

export default AfCFTABuyerOrder;

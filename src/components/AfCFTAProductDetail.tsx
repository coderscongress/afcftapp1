

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import {afcftaProductListings} from '../data/AfCFTAProductListings';
import {afcftaVendorListings} from '../data/AfCFTAVendorListings';
import { debounce } from 'lodash';
import './AfCFTAProductDetail.css';

const AfCFTAProductDetail: React.FC = () => {
  
  const {  productCode } = useParams<{  productCode: string }>();


  const [product, setProduct] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);
  const [buyerEmail, setBuyerEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = afcftaProductListings.find(p => p.productCode === productCode);
    setProduct(foundProduct || null);
	const foundVendor = afcftaVendorListings.find(v => v?.productCode === productCode);
    setVendor(foundVendor || null);
  }, [productCode]);
  
  const handleWhatsAppOrder = () => {
    if (!product) return;

    const message = `Hello, I would like to order:\n\nProduct: ${product.productName}\nPrice: $${product.unitPrice}\n\nPlease confirm availability.`;
    const phone = vendor.phoneNumber || '';
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleEmailOrder = () => {
    if (!product || !buyerEmail) return;

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
    const doc = new jsPDF();
    const text = generateReceiptText().split('\n');
    let y = 10;
    text.forEach(line => {
      doc.text(line, 10, y);
      y += 10;
    });
    doc.save(`${product.name.replace(/\s+/g, '_')}_receipt.pdf`);
  };


  if (!product) return <div className="afcfta-product-detail">Product not found.</div>;

  return (
    <div className="afcfta-product-detail">
	<button onClick={() => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}}>
  Toggle Theme
</button>

      <button onClick={() => navigate(-1)} className="afcfta-back-button">← Back to Listings</button>

      <div className="afcfta-product-content">
        <img src={vendor.productImageUrl} alt={product.productName} className="afcfta-product-image" />

        <div className="afcfta-product-info">
          <h1 className="afcfta-product-title">{product.productName}</h1>
          <p className="afcfta-product-description">{product.description}</p>
          <div className="afcfta-product-price">Price per {vendor.productUnit} : {vendor.currencyCode}{vendor.unitPrice}</div>

          <div className="afcfta-vendor-info">
            <h3>Vendor Information</h3>
            <p><strong>Vendor Company Name:</strong> {vendor.vendorCompanyName}</p>
			<p><strong>Product Descrition:</strong> {vendor.description}</p>
            <p><strong>Country of origin:</strong> {vendor.countryOfOrigin}</p>
            <p><strong>Phone:</strong> {vendor.phoneNumber}</p>
            <p><strong>Email:</strong> {vendor.email}</p>
          </div>

          <div className="afcfta-order-section">
            <button className="afcfta-order-button" onClick={handleWhatsAppOrder}>
              Order via WhatsApp
            </button>

            <div className="afcfta-email-order">
              <input
                type="email"
                placeholder="Enter your email to order by email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
              />
              <button onClick={handleEmailOrder}>Order via Email</button>
            </div>
			
			<div className="afcfta-receipt-buttons">
              <button onClick={downloadTxtReceipt}>Download TXT Receipt</button>
              <button onClick={downloadPdfReceipt}>Download PDF Receipt</button>
            </div>
			
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfCFTAProductDetail;

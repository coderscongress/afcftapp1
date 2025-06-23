

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {afcftaProductListings} from '../data/AfCFTAProductListings';
import {afcftaVendorListings} from '../data/AfCFTAVendorListings';
import { debounce } from 'lodash';
import './AfCFTAVendorDetail.css';

const AfCFTAVendorDetail: React.FC = () => {
  
  const {  vendorCode } = useParams<{  vendorCode: string }>();


  const [product, setProduct] = useState<any>(null);
  const [vendor, setVendor] = useState<any[]>([]);
  const [buyerEmail, setBuyerEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
	  const matchingVendors = afcftaVendorListings.filter(v => v?.vendorCode === vendorCode);// for mulitiple vendor matches [paginate ...]
      setVendor(matchingVendors);	
  }, [vendorCode]);

  const handleWhatsAppOrder = (v: any) => {
  const message = `Hello, I would like to order:\n\nProduct: ${v.productCode}\nPrice: ${v.currencyCode}${v.unitPrice}\n\nPlease confirm availability.`;
  const phone = v.phoneNumber || '';
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

const handleEmailOrder = (v: any) => {
  if (!buyerEmail) return;
  const subject = `Order Inquiry: ${v.vendorCompanyName}`;
  const body = `Dear ${v.vendorCompanyName},\n\nI would like to order the following product:\n\nProduct: ${v.productCode}\nPrice: ${v.currencyCode}${v.unitPrice}\n\nPlease respond to this email to confirm availability.\n\nBest regards,\n${buyerEmail}`;
  const email = v.email || '';
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
};

  if (!vendor) return <div className="afcfta-vendor-detail">Vendor not found.</div>;

  return (
    <div className="afcfta-vendor-detail">
	<button onClick={() => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}}>
  Toggle Theme
</button>

      <button onClick={() => navigate(-1)} className="afcfta-back-button">← Back to Listings</button>
	  

      <div className="afcfta-vendor-content">
	 <ul>
  {vendor.map(v => (
    <li key={v.id}>
      <img src={v.productImageUrl} alt={v.productCode} className="afcfta-vendor-image" />

      <div className="afcfta-vendor-info">
        <h1 className="afcfta-vendor-title">{v.vendorCompanyName}</h1>
        <p className="afcfta-vendor-description">{v.description}</p>
        <div className="afcfta-vendor-price">
          Price per {v.productUnit}: {v.currencyCode}{v.unitPrice}
        </div>

        <div className="afcfta-vendor-info">
          <h3>Vendor Information</h3>
          <p><strong>Vendor Company Name:</strong> {v.vendorCompanyName}</p>
          <p><strong>Product Description:</strong> {v.description}</p>
          <p><strong>Country of origin:</strong> {v.countryOfOrigin}</p>
          <p><strong>Phone:</strong> {v.phoneNumber}</p>
          <p><strong>Email:</strong> {v.email}</p>
        </div>

        <div className="afcfta-order-section">
          <button className="afcfta-order-button" onClick={() => handleWhatsAppOrder(v)}>
            Order via WhatsApp
          </button>

          <div className="afcfta-email-order">
            <input
              type="email"
              placeholder="Enter your email to order by email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
            />
            <button onClick={() => handleEmailOrder(v)}>Order via Email</button>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>

      </div>  
    </div>
  );
};

export default AfCFTAVendorDetail;

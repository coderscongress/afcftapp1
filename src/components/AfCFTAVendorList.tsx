

import React from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

type Vendor = {
  id: string;
  name: string;
  country: string;
  whatsapp: string;
};

const vendors: Vendor[] = [
  { id: '1', name: 'Exporter Inc.', country: 'Nigeria', whatsapp: '+2348001234567' },
  // More vendors...
];

const AfCFTAVendorList: React.FC = () => {
  return (
    <div className="vendor-list">
      <h1>AfCFTA Vendors</h1>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.id}>
            <Link to={`/vendor/${vendor.id}`}>
              <h3>{vendor.name}</h3>
              <p>{vendor.country}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AfCFTAVendorList;
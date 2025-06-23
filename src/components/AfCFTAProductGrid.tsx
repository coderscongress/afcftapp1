
import { useEffect, useState } from 'react';
import { AfCFTAProduct } from '../services/productService';
import { getAfCFTAProducts } from '../services/productService';
import {afcftaProductListings} from '../data/AfCFTAProductListings';
import { debounce } from 'lodash';
import './AfCFTAProductGrid.css';

const AfCFTAProductGrid = () => {
  const [products, setProducts] = useState<AfCFTAProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAfCFTAProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading AfCFTA products...</p>;

  return (
    <div className="afcfta-grid">
      {products.map((product: AfCFTAProduct) => (
        <div key={product.id} className="afcfta-card">
          <img src={product.productImageUrl} alt={product.productName} />
          <h3>{product.productName}</h3>
          <p><strong>Country:</strong> {product.countryOfOrigin}</p>
          <p><strong>Price:</strong> {product.unitPrice} {product.currencyCode}/{product.unit}</p>
          <p><strong>Stock:</strong> {product.stockQuantity}</p>
          <a href={`https://wa.me/${product.WhatsApp}`} target="_blank" rel="noopener noreferrer">
            WhatsApp Vendor
          </a>
        </div>
      ))}
    </div>
  );
};

export default AfCFTAProductGrid;
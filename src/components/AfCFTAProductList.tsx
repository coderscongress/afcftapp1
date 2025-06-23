
import { Link } from 'react-router-dom';
import {afcftaProductListings} from '../data/AfCFTAProductListings';

const AfCFTAProductList: React.FC = () => {
  return (
    <div>
      {afcftaProductListings.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h2>{product.productName}</h2>
          </Link>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};


export default AfCFTAProductList;

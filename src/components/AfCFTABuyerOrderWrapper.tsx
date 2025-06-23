

// AfCFTABuyerOrderWrapper.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import AfCFTABuyerOrder from './AfCFTABuyerOrder';
import { debounce } from 'lodash';

const AfCFTABuyerOrderWrapper: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();

  if (!productCode) return <div>Invalid product code.</div>;

  return <AfCFTABuyerOrder />;

};

export default AfCFTABuyerOrderWrapper;

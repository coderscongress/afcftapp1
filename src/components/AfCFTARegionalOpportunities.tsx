
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import './AfCFTARegionalOpportunities.css';

type Props = {
  productCategory?: string;
  userCountry?: string;
};

const regionalTradeTips: Record<string, string[]> = {
  Agriculture: [
    'High demand in West Africa for processed foods.',
    'East Africa offers free movement of agri-goods under AfCFTA.'
  ],
  Textiles: [
    'North Africa imports high-quality cotton-based products.',
    'Duty-free access to Southern African apparel markets.'
  ],
  Electronics: [
    'Fast-growing tech hubs in Kenya, Rwanda, and Nigeria.',
    'Incentives for assembly and export through regional zones.'
  ],
  All: [
    'High demand in West Africa for processed foods.',
    'East Africa offers free movement of agri-goods under AfCFTA.',
	
	'North Africa imports high-quality cotton-based products.',
    'Duty-free access to Southern African apparel markets.',
	
    'Fast-growing tech hubs in Kenya, Rwanda, and Nigeria.',
    'Incentives for assembly and export through regional zones.'
  ]
};

const defaultTips = [
  'Sell duty-free to 50+ African countries under AfCFTA.',
  'Simplified customs for intra-African e-commerce.',
  'Tap into a unified market of over 1.4 billion people.'
];

const AfCFTARegionalOpportunities: React.FC<Props> = ({
  productCategory = '',
  userCountry = ''
}) => {
  const [tips, setTips] = useState<string[]>(defaultTips);

  useEffect(() => {
    if (productCategory && regionalTradeTips[productCategory]) {
      // Combine matching category tips with default tips
      const matchedTips = [        
        ...defaultTips,
		...regionalTradeTips[productCategory]
      ];
      setTips(matchedTips);
    } else {
      setTips(defaultTips);
    }
  }, [productCategory]);

  return (
    <div className="afcfta-regional-banner">
      <h3>AfCFTA Trade Insights{userCountry && ` for ${userCountry}`}</h3>
      <ul>
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default AfCFTARegionalOpportunities;


import { useState, useEffect } from 'react';

const TariffChecker = () => {
  const [tariffData, setTariffData] = useState(null);
  const [productCode, setProductCode] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');

  useEffect(() => {
    if (productCode && destinationCountry) {
      fetchTariffData(productCode, destinationCountry);
    }
  }, [productCode, destinationCountry]);

  const fetchTariffData = async (productCode: string, destinationCountry: string) => {
    try {
      const response = await fetch(`https://afcfta-api.com/tariff?productCode=${productCode}&destinationCountry=${destinationCountry}`);
      const data = await response.json();
      setTariffData(data);
    } catch (error) {
      console.error('Error fetching tariff data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        placeholder="Enter product code"
      />
      <input
        type="text"
        value={destinationCountry}
        onChange={(e) => setDestinationCountry(e.target.value)}
        placeholder="Enter destination country"
      />
      <button onClick={() => fetchTariffData(productCode, destinationCountry)}>Check Tariff</button>

      {tariffData && (
        <div>
          <h3>Tariff Information:</h3>
          <p>Product: {}</p>
          <p>Tariff: {}%</p>
          <p>Compliance: {0 ? 'Eligible for AfCFTA' : 'Not eligible for AfCFTA'}</p>
        </div>
      )}
    </div>
  );
};

export default TariffChecker;
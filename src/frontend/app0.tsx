

// src/frontend/app.tsx  
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AfCFTABuyerOrder from '../components/AfCFTABuyerOrder';
import NotFound from '../components/NotFound';
import AfCFTAProductDetail from '../components/AfCFTAProductDetail';
import AfCFTAVendorDetail from '../components/AfCFTAVendorDetail';
import AfCFTARegionalOpportunities from '../components/AfCFTARegionalOpportunities';
import AfCFTAOrderForm from '../components/AfCFTAOrderForm';
import AfCFTAProductGrid from '../components/AfCFTAProductGrid';
import AfCFTAProductList from '../components/AfCFTAProductList';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
	    <Route path="/" element={<div>Welcome to AfCFTA App!!!</div>} />
        <Route path="/buyer-order/:productCode" element={<AfCFTABuyerOrder />} />
		<Route path="/product-detail/:productCode" element={<Suspense fallback={<div>Loading...</div>}>
              <AfCFTAProductDetail />
              </Suspense>} />
		<Route path="/vendor-detail/:vendorCode" element={<Suspense fallback={<div>Loading...</div>}>
              <AfCFTAVendorDetail />
              </Suspense>} />
        <Route path="/afcfta-tips" element={<Suspense fallback={<div>Loading...</div>}>
              <AfCFTARegionalOpportunities productCategory="All" userCountry="Ghana" />
              </Suspense>} />
        <Route path="/afcfta-orderform" element={<Suspense fallback={<div>Loading...</div>}>
              <AfCFTAOrderForm />
              </Suspense>} />
        <Route path="/productgrid" element={<Suspense fallback={<div>Loading...</div>}>
              <AfCFTAProductGrid />
              </Suspense>} />			  
		<Route path="/product-list" element={<AfCFTAProductList />} />
		
		
		{/*<Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/vendors" element={<VendorListPage />} />
        <Route path="/vendors/:id" element={<VendorDetailPage />} />
        <Route path="/order/:productCode" element={<OrderForm />} />
        <Route path="/tracking/:ticketId" element={<TrackingPage />} />*/}
		
		<Route path="*" element={<NotFound />} />  {/* Catch-all fallback */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;


import '../i18n'; // <-- Important: this initializes i18next
import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const AfCFTABuyerOrder = React.lazy(() => import('../components/AfCFTABuyerOrder'));
const AfCFTAProductDetail = React.lazy(() => import('../components/AfCFTAProductDetail'));
const AfCFTAVendorDetail = React.lazy(() => import('../components/AfCFTAVendorDetail'));
const AfCFTARegionalOpportunities = React.lazy(() => import('../components/AfCFTARegionalOpportunities'));
const AfCFTAOrderForm = React.lazy(() => import('../components/AfCFTAOrderForm'));
const AfCFTAProductGrid = React.lazy(() => import('../components/AfCFTAProductGrid'));
const AfCFTAProductList = React.lazy(() => import('../components/AfCFTAProductList'));
const AfCFTAChatbot = React.lazy(() => import('../components/AfCFTAChatbot'));
const AfCFTAHelpPage = React.lazy(() => import('../components/AfCFTAHelpPage'));
const AfCFTASubscribeForm = React.lazy(() => import('../components/AfCFTASubscribeForm'));
const AfCFTAChatRoom = React.lazy(() => import('../components/AfCFTAChatRoom'));
const ExampleTranslation = React.lazy(() => import('../components/ExampleTranslation'));
import NotFound from '../components/NotFound';
import '../styles/afcfta-theme.css';
import AfCFTAHome from '../pages/AfCFTAHome';






const App: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="afcfta-app-container">
        <Routes>
          
		  <Route path="/" element={<AfCFTAHome />} />
          <Route path="/chatbot" element={<AfCFTAChatbot />} />
		  <Route path="/subscribe" element={<AfCFTASubscribeForm />} />
		  <Route path="/chat/:roomId" element={<AfCFTAChatRoom />} />
          <Route path="/buyer-order/:productCode" element={<AfCFTABuyerOrder />} />
          <Route path="/product-detail/:productCode" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AfCFTAProductDetail />
            </Suspense>
          } />
          <Route path="/vendor-detail/:vendorCode" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AfCFTAVendorDetail />
            </Suspense>
          } />
          <Route path="/afcfta-tips" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AfCFTARegionalOpportunities productCategory="All" userCountry="Ghana" />
            </Suspense>
          } />
          <Route path="/afcfta-orderform" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AfCFTAOrderForm />
            </Suspense>
          } />
          <Route path="/productgrid" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AfCFTAProductGrid />
            </Suspense>
          } />
          <Route path="/product-list" element={<AfCFTAProductList />} />
		   {/* src/frontend/app.tsx */}
          <Route path="/help" element={<AfCFTAHelpPage />} />
		  <Route path="/exampletrans" element={<ExampleTranslation />} />
          <Route path="*" element={<NotFound />} />
		  
		  
		  {/*<Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/vendors" element={<VendorListPage />} />
        <Route path="/vendors/:id" element={<VendorDetailPage />} />
        <Route path="/order/:productCode" element={<OrderForm />} />
        <Route path="/tracking/:ticketId" element={<TrackingPage />} />*/}
		
        </Routes>
		
		

        {/* Floating Chat Button */}
        <button className="chatbot-toggle-btn" onClick={toggleChatbot} title="Chat with us!">
          💬
        </button>

        {/* Chatbot Panel */}
        {showChatbot && <AfCFTAChatbot />}
      </div>
    </BrowserRouter>
  );
};

export default App;


import '../i18n'; // <-- Important: this initializes i18next
import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AfCFTABuyerOrder from '../components/AfCFTABuyerOrder';
import NotFound from '../components/NotFound';
import AfCFTAProductDetail from '../components/AfCFTAProductDetail';
import AfCFTAVendorDetail from '../components/AfCFTAVendorDetail';
import AfCFTARegionalOpportunities from '../components/AfCFTARegionalOpportunities';
import AfCFTAOrderForm from '../components/AfCFTAOrderForm';
import AfCFTAProductGrid from '../components/AfCFTAProductGrid';
import AfCFTAProductList from '../components/AfCFTAProductList';
import AfCFTAChatbot from '../components/AfCFTAChatbot'; 
import AfCFTAHelpPage from '../components/AfCFTAHelpPage';
import SubscribeForm from '../components/SubscribeForm'; 
import ChatRoom from '../components/ChatRoom'; 
import '../components/AfCFTAChatbot.css'; 
import ExampleTranslation from '../components/ExampleTranslation';
import '../styles/afcfta-theme.css';
import Home from '../pages/Home';




const App: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="afcfta-app-container">
        <Routes>
          
		  <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<AfCFTAChatbot />} />
		  <Route path="/subscribe" element={<SubscribeForm />} />
		  <Route path="/chat/:roomId" element={<ChatRoom />} />
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

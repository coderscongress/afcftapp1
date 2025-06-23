// src/pages/Home.tsx

import i18n from 'i18next';
import '../i18n'; // <-- Important: this initializes i18next
import { useTranslation, Trans } from 'react-i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';



const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
   
  return (
    <div className="afcfta-pro">
      <div className="afcfta-pro-content">
        <h1>
        <Trans i18nKey="homeTitle">
          Welcome to <span>AfCFTApp</span>
        </Trans>
      </h1>
      <p>
        <Trans i18nKey="homeIntro">
          Whether you're a <strong>business tycoon in Accra</strong>, an <strong>exporter in Nairobi</strong>,
          or a <strong>buyer in Dakar</strong>, <span>AfCFTApp</span> helps you harness the full potential of the
          <strong> African Continental Free Trade Area (AfCFTA)</strong>.
        </Trans>
      </p>
      <p className="afcfta-icons">
        <Trans i18nKey="homeSlogan">
          🔍 <strong>Search.</strong> 📦 <strong>Trade.</strong> 🤝 <strong>Connect.</strong><br />
          <em>One Continent. One Market. One Platform. One Africa.</em>
        </Trans>
      </p>
        <button className="chatbot-button" onClick={() => navigate('/chatbot')}>
          {t('launchChatbot')}
        </button>&nbsp;&nbsp;
		<p>{t('subscribeMessage')} <button className="chatbot-button" onClick={() => navigate('/subscribe')}>
          {t('subscribeLabel')}
        </button></p>
      </div>
    </div>
  );
};

export default Home;

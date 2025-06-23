// src/pages/Home.tsx

import i18n from 'i18next';
import '../i18n';
import { useTranslation, Trans } from 'react-i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

    const startChatAndInvite = () => {
    const roomId = uuidv4();
    const chatUrl = `https://afcftapp.firebaseapp.com/chat/${roomId}`;
    const message = encodeURIComponent(`${t('inviteMessage')} ${chatUrl}`);
    const whatsappLink = `https://wa.me/?text=${message}`;

    window.open(whatsappLink, '_blank');
    navigate(`/chat/${roomId}`);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };
  
  localStorage.setItem('chat_role', 'Host');
  navigate(`/chat/${roomId}`);


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

        <div className="home-buttons">
          <button className="chatbot-button" onClick={() => navigate('/chatbot')}>
            {t('launchChatbot')}
          </button>
          &nbsp;&nbsp;
          <button className="chatbot-button" onClick={() => navigate('/subscribe')}>
            {t('subscribeLabel')}
          </button>
          &nbsp;&nbsp;
          <button className="chatbot-button" onClick={startChatAndInvite}>
            ➕ {t('startNewChat')}
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <strong>{t('selectLanguage')}:</strong>&nbsp;
          {['en', 'fr', 'sw', 'yo', 'ha', 'tw'].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              style={{
                margin: '4px',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: i18n.language === lng ? '#007bff' : '#ccc',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

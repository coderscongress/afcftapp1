

// SubscribeForm.tsx

import i18n from 'i18next';
import '../i18n'; // <-- Important: this initializes i18next
import { useTranslation, Trans } from 'react-i18next';
import React, { useState } from 'react';
import './AfCFTASubscribeForm.css';

const AfCFTASubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useTranslation();

  const handleSubscribe = async () => {
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }

    try {
      // Example API call - replace with your backend/mail service
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
      <div className="afcfta-pro">
      <div className="afcfta-pro-content">
    <div className="subscribe-container">
      <h3>🔔 Stay Updated</h3>
      <p>Subscribe for trade updates, new vendors & exclusive deals</p>
      <div className="subscribe-inputs">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>{t('subscribeLabel')}</button>
      </div>
      {status === 'success' && <p className="success-msg">🎉 You're subscribed!</p>}
      {status === 'error' && <p className="error-msg">⚠️ Please enter a valid email.</p>}
    </div>
	</div>
	</div>
  );
};

export default AfCFTASubscribeForm;

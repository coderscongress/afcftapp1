



// src/components/ExampleTranslation.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const ExampleTranslation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '1rem' }}>
      <label>{t('placeholder')}</label><br />
      <input placeholder={t('placeholder')} />
    </div>
  );
};

export default ExampleTranslation;

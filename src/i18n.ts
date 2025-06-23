

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translation_en from './locales/en/translation.json';
import translation_fr from './locales/fr/translation.json';
import translation_sw from './locales/sw/translation.json';
import translation_yo from './locales/yo/translation.json';
import translation_ha from './locales/ha/translation.json';
import translation_tw from './locales/tw/translation.json';

const resources = {
  en: { translation: translation_en },
  fr: { translation: translation_fr },
  sw: { translation: translation_sw },
  yo: { translation: translation_yo },
  ha: { translation: translation_ha },
  tw: { translation: translation_tw },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

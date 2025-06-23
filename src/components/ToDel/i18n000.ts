
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to the AfCFTApp chatbot!",
        placeholder: "Ask about trade, tariffs...",
      }
    },
    fr: {
      translation: {
        welcome: "Bienvenue sur le chatbot AfCFTA!",
        placeholder: "Demandez sur le commerce, les tarifs...",
      }
    },
    sw: {
      translation: {
        welcome: "Karibu kwenye chatbot ya AfCFTA!",
        placeholder: "Uliza kuhusu biashara, ushuru...",
      }
    }
  },
  lng: "en", // Can be dynamically set via locale detection
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

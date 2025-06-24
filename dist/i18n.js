"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
// Import translation files
const translation_json_1 = __importDefault(require("./locales/en/translation.json"));
const translation_json_2 = __importDefault(require("./locales/fr/translation.json"));
const translation_json_3 = __importDefault(require("./locales/sw/translation.json"));
const translation_json_4 = __importDefault(require("./locales/yo/translation.json"));
const translation_json_5 = __importDefault(require("./locales/ha/translation.json"));
const translation_json_6 = __importDefault(require("./locales/tw/translation.json"));
const resources = {
    en: { translation: translation_json_1.default },
    fr: { translation: translation_json_2.default },
    sw: { translation: translation_json_3.default },
    yo: { translation: translation_json_4.default },
    ha: { translation: translation_json_5.default },
    tw: { translation: translation_json_6.default },
};
i18next_1.default
    .use(react_i18next_1.initReactI18next)
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
exports.default = i18next_1.default;

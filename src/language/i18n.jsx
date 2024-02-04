import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './lang/en.json';
import plTranslation from './lang/pl.json';
import isTranslation from './lang/is.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      EN: { translation: enTranslation },
      PL: { translation: plTranslation },
      IS: { translation: isTranslation },
    },
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false,
    },
    detection: {
    //   // order: ['localStorage', 'navigator'],
    //   // lookupLocalStorage: 'i18nextLng', // Klucz w localStorage
    //   // lookupSessionStorage: 'i18nextLng', // Klucz w sessionStorage
    //   // caches: ['localStorage', 'sessionStorage'],
      excludeCacheFor: ['cimode'], // Wyklucz 'cimode'
      // preprocess: (languages) => languages.map(lang => lang.split('-')[0].toUpperCase()),
    //   // Ustawienie języka przedstawionego w jednym formie (bez kwalifikatora regionalnego)
    //   // np. "pl" zamiast "pl-PL"
    //   // lookupFromPathIndex: 0,
    //   // lookupFromSubdomainIndex: 0,
    //   // Ustawienia zamiany kodu języka
    //   // W tym przypadku używamy funkcji transformLanguageCode
    //   // lookupFromPath: (path) => transformLanguageCode(path),
    //   // lookupFromSubdomain: (subdomain) => transformLanguageCode(subdomain),
    },
  })
  .then(() => initReactI18next)
  .catch((error) => console.error('Error initializing i18n:', error));

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
};

i18n
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    resources,
    lng: 'en', // language to use
    fallbackLng: 'en', // language to use if translations in user language are not available
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './locales/tr.json';
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import hi from './locales/hi.json';
import ko from './locales/ko.json';

// Ülke kodlarına göre dil eşleştirmesi
export const countryToLanguage: Record<string, string> = {
  'TR': 'tr', // Türkiye
  'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en', // İngilizce
  'DE': 'de', 'AT': 'de', 'CH': 'de', // Almanca (CH için de)
  'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'MC': 'fr', // Fransızca
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es', // İspanyolca
  'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'IQ': 'ar', 'JO': 'ar', 'KW': 'ar', 'LB': 'ar', 'LY': 'ar', 'MA': 'ar', 'OM': 'ar', 'QA': 'ar', 'SY': 'ar', 'TN': 'ar', 'YE': 'ar', // Arapça
  'JP': 'ja', // Japonca
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh', // Çince
  'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'KG': 'ru', // Rusça
  'PT': 'pt', 'BR': 'pt', 'AO': 'pt', 'MZ': 'pt', // Portekizce
  'IT': 'it', 'SM': 'it', 'VA': 'it', // İtalyanca
  'IN': 'hi', // Hintçe
  'KR': 'ko', // Korece
};

// Konum bazlı dil tespiti
export const detectLanguageFromCountry = (countryCode: string): string => {
  return countryToLanguage[countryCode] || 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      es: { translation: es },
      ar: { translation: ar },
      ja: { translation: ja },
      zh: { translation: zh },
      ru: { translation: ru },
      pt: { translation: pt },
      it: { translation: it },
      hi: { translation: hi },
      ko: { translation: ko },
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

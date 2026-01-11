import { useEffect } from 'react';
import i18n from '@/i18n/config';
import { detectLanguageFromCountry } from '@/i18n/config';

export const useLanguageDetection = (countryCode: string | null) => {
  useEffect(() => {
    if (countryCode) {
      const detectedLang = detectLanguageFromCountry(countryCode);
      const currentLang = i18n.language.split('-')[0]; // 'en-US' -> 'en'
      
      // Eğer tespit edilen dil mevcut dilden farklıysa ve localStorage'da kayıtlı bir dil tercihi yoksa
      if (detectedLang !== currentLang && !localStorage.getItem('i18nextLng')) {
        i18n.changeLanguage(detectedLang);
      }
    }
  }, [countryCode]);
};

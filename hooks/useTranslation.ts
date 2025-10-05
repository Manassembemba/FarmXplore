import { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';

const translations = { en, fr };

const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = useCallback((key: string): string => {
    const value = getNestedValue(translations[language], key);
    return value || key;
  }, [language]);

  return { t, lang: language };
};

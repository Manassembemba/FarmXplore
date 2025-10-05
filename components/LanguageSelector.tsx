
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const buttonStyle = (lang: 'en' | 'fr') =>
    `px-3 py-1 text-sm font-bold rounded-md transition-colors ${
      language === lang
        ? 'bg-sky-500 text-white'
        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
    }`;

  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
      <button onClick={() => setLanguage('en')} className={buttonStyle('en')}>
        EN
      </button>
      <button onClick={() => setLanguage('fr')} className={buttonStyle('fr')}>
        FR
      </button>
    </div>
  );
};

export default LanguageSelector;

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    AsyncStorage.getItem('petpill_language').then(saved => {
      if (saved && translations[saved]) setLanguage(saved);
    });
  }, []);

  const changeLanguage = async (code) => {
    if (translations[code]) {
      await AsyncStorage.setItem('petpill_language', code);
      setLanguage(code);
    }
  };

  // t() translates a key, optionally replacing {placeholders}
  const t = (key, params = {}) => {
    const lang = translations[language] || translations.en;
    let str = lang[key] ?? translations.en[key] ?? key;
    Object.entries(params).forEach(([k, v]) => {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

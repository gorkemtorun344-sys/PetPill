import { I18nManager } from 'react-native';
import en from './translations/en';
import tr from './translations/tr';
import de from './translations/de';
import it from './translations/it';
import es from './translations/es';
import ar from './translations/ar';
import zh from './translations/zh';
import ru from './translations/ru';

const translations = { en, tr, de, it, es, ar, zh, ru };

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
];

let currentLanguage = 'en';

export const setLanguage = (langCode) => {
  if (translations[langCode]) {
    currentLanguage = langCode;
    // Enable RTL for Arabic
    const isRTL = langCode === 'ar';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
    }
  }
};

export const getLanguage = () => currentLanguage;

export const t = (key) => {
  const lang = translations[currentLanguage];
  if (lang && lang[key] !== undefined) {
    return lang[key];
  }
  // Fallback to English
  if (en[key] !== undefined) {
    return en[key];
  }
  return key;
};

export default { t, setLanguage, getLanguage, LANGUAGES };

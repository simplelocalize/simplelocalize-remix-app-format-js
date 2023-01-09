import React from "react";

interface LanguageContext {
  changeLanguage: (language: string) => void;
  language: string;
}

const LanguageContext = React.createContext<LanguageContext>({
  language: '',
  changeLanguage: () => {
    console.warn('LanguageContext.changeLanguage not implemented');
  },
});

export default LanguageContext;

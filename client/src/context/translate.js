import { useState, useEffect, useContext, createContext } from "react";

import translation from "../translation";

const TranslateContext = createContext();

export const useTranslate = () => useContext(TranslateContext);

const TranslateProvider = ({ children }) => {
  const [germanLang, setGermanLang] = useState(false);
  const [language, setLanguage] = useState(translation.english);

  useEffect(() => {
    if (germanLang) setLanguage(translation.german);
    else setLanguage(translation.english);
  }, [germanLang]);

  const value = { germanLang, setGermanLang, language };
  return (
    <TranslateContext.Provider value={value}>
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;

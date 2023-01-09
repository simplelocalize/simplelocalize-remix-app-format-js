import React from "react";
import type { MessageFormatElement} from 'react-intl';
import {IntlProvider} from 'react-intl'
import LanguageContext from "./LanguageContext";

// SimpleLocalize project > Integrations > Project Credentials > Project Token
const PROJECT_TOKEN = "MY_PROJECT_TOKEN";

const BASE_URL = "https://cdn.simplelocalize.io";
const ENVIRONMENT = "_latest"; // or "_production"
const DEFAULT_LANGUAGE = "en"; // language key from SimpleLocalize

const SimpleLocalize = ({children}: { children: React.ReactNode }) => {
  const [messages, setMessages] = React.useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>({});
  const [language, setLanguage] = React.useState<string>(DEFAULT_LANGUAGE);


  //You can also load messages from file in 'fetchTranslationMessages' method.
  // To download messages from SimpleLocalize,
  // use CLI: https://simplelocalize.io/docs/cli/download-translations/
  //
  // Sample CLI command to download messages from SimpleLocalize:
  // simplelocalize download \
  //  --apiKey MY_PROJECT_API_KEY \
  //  --downloadPath ./{lang}/translations.json \
  //  --downloadFormat single-language-json

  const fetchTranslationMessages = (language: string): void => {
    const messages = `${BASE_URL}/${PROJECT_TOKEN}/${ENVIRONMENT}/${language}`;
    fetch(messages)
      .then((data) => data.json())
      .then((messages) => setMessages(messages));
  };

  React.useEffect(() => fetchTranslationMessages(language), [language]);

  return (
    <LanguageContext.Provider
      value={{
        changeLanguage: (language: string) => setLanguage(language),
        language
      }}>
      <IntlProvider
        locale={language}
        messages={messages}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default SimpleLocalize;

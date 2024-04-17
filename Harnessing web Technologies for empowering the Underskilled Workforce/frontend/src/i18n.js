import i18n from 'i18next';
import LanguageDectector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from "i18next-http-backend";


i18n
    .use(LanguageDectector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        debug: true,
        fallbacklng : "en",
        supportedlngs: ['en', 'ta'],
        returnObjects: true,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        }
    );
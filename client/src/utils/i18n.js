import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallBackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                profile: "Profile",
                settings: "Settings",
                orders: "Orders"
            }
        },
        ur: {
            translation: {
                profile: "پروفائل",
                settings: "ترتیبات",
                orders: "آرڈرز"
            }
        }
    }
});

export default i18n;
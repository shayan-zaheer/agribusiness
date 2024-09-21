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
                title: "AGRIBUSINESS",
                profile: "Profile",
                settings: "Settings",
                orders: "Orders",
                "farmer name": "Farmer's Name",
                variety: "Variety",
                quantity: "Quantity",
                "order date": "Order Date",
                status: "Status",
                "message farmer": "Message Farmer"
            }
        },
        ur: {
            translation: {
                title: "ایگری بزنس",
                profile: "پروفائل",
                settings: "ترتیبات",
                orders: "آرڈرز",
                "farmer name": "کسان کا نام",
                variety: "قسم",
                quantity: "مقدار",
                "order date": "آرڈر کی تاریخ",
                status: "درجہ",
                "message farmer": "کسان کو پیغام بھیجیں"
            }
        }
    }
});

export default i18n;
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
                "message farmer": "Message Farmer",
                messages: "Messages",
                "home description": `"Harvesting a Better Future Together"`,
                "empowering farmers": "Empowering Farmers",
                "connecting buyers": "Connecting Buyers",
                "who": "Who Are You?",
                farmer: "Farmer",
                buyer: "Buyer",
                seller: "Seller"
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
                "message farmer": "کسان کو پیغام بھیجیں",
                messages: "میسیج",
                "home description": "آئیے مل کر ایک بہتر مستقبل کی فصل کاٹیں",
                "empowering farmers": 'کسانوں کو بااختیار بنانا',
                "connecting buyers": "خریداروں سے جڑنا",
                who: "آپ کون ہیں؟",
                farmer: "کسان",
                buyer: "خریدار",
                seller: "بیچنے والا"
            }
        }
    }
});

export default i18n;
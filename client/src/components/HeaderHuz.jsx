import React from 'react';
import { useTranslation } from 'react-i18next';

function HeaderHuz() {
    const { i18n, t } = useTranslation();

    function onChangeLang(event) {
        const currentLang = i18n.language === "en" ? "ur" : "en";
        i18n.changeLanguage(currentLang);
    }

    return (
        <header className="text-center py-2 bg-green-800 flex flex-row justify-center relative">
            <img 
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full mr-2" 
                src="./logo.png" 
                alt="logo" 
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl w-64 font-bold text-white">
                {t("title")}
            </h1>
            <div className="absolute right-3 top-5 text-white">
                <span className="mr-2 font-bold text-lg sm:text-xl">
                    {i18n.language === "en" ? "English" : "Urdu"}
                </span>
                <button
                    onClick={onChangeLang}
                    className="text-2xl sm:text-xl pt-1 pr-2.5 pl-2.5 pb-0.5 rounded-full hover:bg-green-500 transition"
                >
                    ▼
                </button>
            </div>
        </header>
    );
}

export default HeaderHuz;

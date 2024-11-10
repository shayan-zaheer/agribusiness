import React from 'react';
import { useTranslation } from 'react-i18next';

function HeaderHuz() {
    const { i18n, t } = useTranslation();

    function onChangeLang() {
        const currentLang = i18n.language === "en" ? "ur" : "en";
        i18n.changeLanguage(currentLang);
    }

    return (
        <header className="flex flex-wrap items-center justify-center p-4 bg-gray-800">
            <div className="flex items-center">
                <img className="w-8 sm:w-10 lg:w-12 pr-2" src="./nav-icon.png" alt="logo" />
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white">{t("title")}</h1>
            </div>

            <div className="flex items-center absolute top-4 sm:top-5 right-4 sm:right-6 lg:right-8">
                <span className="text-sm sm:text-lg lg:text-xl text-white font-bold mr-2">
                    {i18n.language === "en" ? "English" : "Urdu"}
                </span>
                <button
                    onClick={onChangeLang}
                    className="text-base sm:text-xl p-1 border-2 rounded-full hover:bg-black transition text-white"
                >
                    ▼
                </button>
            </div>
        </header>
    );
}

export default HeaderHuz;


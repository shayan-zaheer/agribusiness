import React from 'react';
import { useTranslation } from 'react-i18next';

function HeaderHuz() {
    const {i18n, t} = useTranslation();

    function onChangeLang(event) {
		const currentLang = i18n.language === "en" ? "ur" : "en";
		i18n.changeLanguage(currentLang);
	}

  return (
   <header className="text-center py-2 bg-gray-800 flex flex-row justify-center">
      <img className='w-12 pr-2' src="./nav-icon.png" alt="logo" />
        <h1 className="text-4xl w-64 font-bold text-white ">{t("title")}</h1>

        <div className=" absolute right-3 top-5  text-white ">
        <span className="mr-2 font-bold text-xl">{i18n.language === "en" ? "English" : "Urdu"}</span>
        <button onClick={onChangeLang} className="text-2xl -mt-20  pt-1 pr-2.5 pl-2.5 pb-0.5 border-2 rounded-full  hover:bg-black transition ">▼</button>
      </div>

      </header>
  ); 
}

export default HeaderHuz;

import { LuLanguages, LuSettings } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SideItem from "./components/SideItem";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    const {i18n, t} = useTranslation()

    function onChangeLang(event){
        const currentLang = i18n.language === "en" ? "ur" : "en";

        i18n.changeLanguage(currentLang);
    }
	return (
        <>
            <Header />
            <div>
                <Sidebar>
                    <Link to="/profile">
                        <SideItem text={t("profile")} active={location.pathname === "/profile"} icon={<CgProfile/>}/>
                    </Link>
                    <Link to="/orders">
                        <SideItem active={location.pathname === "/orders"} text={t("orders")} icon={<CiShoppingCart />}/>
                    </Link>
                    <Link to="/settings">
                        <SideItem active={location.pathname === "/settings"} text={t("settings")} icon={<LuSettings />}/>
                    </Link>
                    <SideItem onClick={onChangeLang} text={i18n.language === "en" ? "English" : "Urdu"} icon={<LuLanguages />}/>
                </Sidebar>
            </div>
        </>
    );
}

export default App;

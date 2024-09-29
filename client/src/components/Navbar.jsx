import { LuLanguages, LuMessageCircle, LuSettings } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import Sidebar from "./Sidebar";
import SideItem from "./SideItem";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
	const location = useLocation();
	const { i18n, t } = useTranslation();

	function onChangeLang(event) {
		const currentLang = i18n.language === "en" ? "ur" : "en";

		i18n.changeLanguage(currentLang);
	}

	return (
		<Sidebar>
			<Link to="/profile">
				<SideItem
					text={t("profile")}
					active={location.pathname === "/profile"}
					icon={<CgProfile />}
				/>
			</Link>
			<Link to="/products">
				<SideItem
					active={location.pathname === "/products"}
					text={t("products")}
					icon={<CiShoppingCart />}
				/>
			</Link>
			<Link to="/settings">
				<SideItem
					active={location.pathname === "/settings"}
					text={t("settings")}
					icon={<LuSettings />}
				/>
			</Link>
			<Link to="/messages">
				<SideItem
					active={location.pathname === "/messages"}
					text={t("messages")}
					icon={<LuMessageCircle />}
				/>
			</Link>
			<SideItem
				onClick={onChangeLang}
				text={i18n.language === "en" ? "English" : "Urdu"}
				icon={<LuLanguages />}
			/>
		</Sidebar>
	);
}

export default Navbar;

import { LuChevronDown, LuMoreVertical } from "react-icons/lu";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { userActions } from "../store/userSlice";
import { Link, useLocation } from "react-router-dom";
import { LuLanguages } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { LuMessageCircle, LuSettings } from "react-icons/lu";

function Header() {
	const user = useSelector(store => store.user);
	const dispatch = useDispatch();
	const {i18n, t } = useTranslation();
	const location = useLocation();

	useEffect(() => {
		async function updateProfile() {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/users/userdata`,
				{ withCredentials: true }
			);
			dispatch(userActions.userProfile(response.data.user));
		}
		updateProfile();
	}, [dispatch]);

	function onChangeLang(event) {
		const currentLang = i18n.language === "en" ? "ur" : "en";
		i18n.changeLanguage(currentLang);
	}

	return (
		<header className="bg-gray-800 shadow-md">
			<div className="container mx-auto flex justify-between items-center p-4">
				<img
					src="./nav-icon.png"
					className="w-10 h-10"
					alt=""
				/>
				<nav className="flex space-x-4">
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
				</nav>
			</div>
		</header>
	);
};

function SideItem({ text, icon, active, onClick }) {
	return (
		<div
			onClick={onClick}
			className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all ${active ? "bg-green-50" : "hover:bg-green-100 text-black"}`}
		>
			{icon}
			<span className="ml-2">{text}</span>
		</div>
	);
}

export default Header;

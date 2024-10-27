import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLanguages } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { LuMessageCircle, LuSettings } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import axios from "axios";

function Header() {
	const { i18n, t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const [username, setUsername] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dispatch = useDispatch();

	async function logout() {
		try {
			const response = await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
			console.log(response);
			navigate("/");
		} catch (error) {
			console.error("Logout failed", error);
		}
	}

	useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/users/userdata`,
                    { withCredentials: true }
                );
				const userData = response?.data?.user;
                dispatch(userActions.userProfile(userData));
				setUsername(userData?.username);
                } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [dispatch]);

	function onChangeLang() {
		const currentLang = i18n.language === "en" ? "ur" : "en";
		i18n.changeLanguage(currentLang);
	}

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<header className="bg-gray-800 shadow-md">
			<div className="container mx-auto flex justify-between items-center p-4">
				<img
					src="./nav-icon.png"
					className="w-10 h-10"
					alt="Logo"
				/>

				<div className="block lg:hidden">
					<button onClick={toggleMenu}>
						<GiHamburgerMenu className="text-white text-3xl" />
					</button>
				</div>

				<nav className="hidden lg:flex space-x-4 items-center">
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

					<div className="flex items-center space-x-2">
						<span className="text-white font-medium">{username}</span>
						<button onClick={() => logout()} className="text-red-400 ml-4">
							{t("logout")}
						</button>
					</div>
				</nav>

				{isMenuOpen && (
					<nav className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-md">
						<div className="flex flex-col space-y-2">
							<Link to="/profile" onClick={() => setIsMenuOpen(false)}>
								<SideItem
									text={t("profile")}
									active={location.pathname === "/profile"}
									icon={<CgProfile />}
								/>
							</Link>
							<Link to="/products" onClick={() => setIsMenuOpen(false)}>
								<SideItem
									active={location.pathname === "/products"}
									text={t("products")}
									icon={<CiShoppingCart />}
								/>
							</Link>
							<Link to="/settings" onClick={() => setIsMenuOpen(false)}>
								<SideItem
									active={location.pathname === "/settings"}
									text={t("settings")}
									icon={<LuSettings />}
								/>
							</Link>
							<Link to="/messages" onClick={() => setIsMenuOpen(false)}>
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

							<div className="flex items-center p-4">
								<span className="ml-2 text-white">{username}</span>
							</div>
							<button
								onClick={() => { logout(); setIsMenuOpen(false); }}
								className="text-red-400 p-2"
							>
								{t("logout")}
							</button>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}

function SideItem({ text, icon, active, onClick }) {
	return (
		<div
			onClick={onClick}
			className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all ${active ? "bg-green-50 text-black" : "hover:bg-green-100 hover:text-black text-white"
				}`}
		>
			{icon}
			<span className="ml-2">{text}</span>
		</div>
	);
}

export default Header;

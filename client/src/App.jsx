import { LuLanguages, LuSettings } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SideItem from "./components/SideItem";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import OrderItem from "./components/OrderItem";
import { useEffect, useRef } from "react";
import { initSocket } from "./utils/socket";
import { toast, ToastContainer } from "react-toastify";

function App() {
    const socketRef = useRef(null);

    useEffect(() => {
		const init = async () => {
			socketRef.current = await initSocket();

			socketRef.current.on("connect_error", handleErrors);
			socketRef.current.on("connect_failed", handleErrors);

			function handleErrors(error) {
				console.log("Socket error!", error);
				toast.error("Socket connection failed, try again later!", {
					position: "top-right",
				});
			}

			// socketRef.current.emit("join", {
			// 	roomId,
			// 	username: location.state?.username,
			// 	role: location.state?.role,
			// });

			// socketRef.current.on(
			// 	"joined",
			// 	({ username, clients, recentJoinedID, role }) => {
			// 		if (username !== location.state?.username) {
			// 			toast.success(`${username} joined the room!`, {
			// 				theme: "dark",
			// 				position: "top-right",
			// 			});
			// 		}
			// 		setClients(clients);
            //         if(editInstance){
            //                 console.log(editInstance?.getValue())
            //                 socketRef.current.emit("sync-code", {
            //                     recentJoinedID,
            //                     value: editInstance?.getValue() || "",
            //                 });
            //             }
			// 	}
			// );

			// socketRef.current.on("disconnected", ({ socketID, username }) => {
			// 	toast.success(`${username} left the room!`, {
			// 		theme: "dark",
			// 		position: "top-right",
			// 	});
			// 	setClients((prev) =>
			// 		prev.filter((client) => client.socketID !== socketID)
			// 	);
			// });
		};

		init();

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				// socketRef.current.off("join");
				// socketRef.current.off("joined");
				// socketRef.current.off("disconnected");
				socketRef.current.off("connect_error");
				socketRef.current.off("connect_failed");
			}
		};
	}, []);


	const location = useLocation();
	const { i18n, t } = useTranslation();

	function onChangeLang(event) {
		const currentLang = i18n.language === "en" ? "ur" : "en";

		i18n.changeLanguage(currentLang);
	}
	return (
		<>
            <ToastContainer />
			<div className="flex">
				<Sidebar>
					<Link to="/profile">
						<SideItem
							text={t("profile")}
							active={location.pathname === "/profile"}
							icon={<CgProfile />}
						/>
					</Link>
					<Link to="/orders">
						<SideItem
							active={location.pathname === "/orders"}
							text={t("orders")}
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
					<SideItem
						onClick={onChangeLang}
						text={i18n.language === "en" ? "English" : "Urdu"}
						icon={<LuLanguages />}
					/>
				</Sidebar>
				<div className="flex-1 flex-col">
					<Header />
					<div>
						<OrderItem />
						<OrderItem />
						<OrderItem />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;

import { LuChevronFirst, LuChevronLast, LuMoreVertical } from "react-icons/lu";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { barActions } from "../store/barSlice";
import { useTranslation } from "react-i18next";

function Sidebar({ children }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const open = useSelector((store) => store.bar);
	return (
		<aside className={`h-screen ${open ? "w-64" : "w-16"} transition-all`}>
			<nav className="h-full flex flex-col bg-[rgb(167,217,167)] border-r shadow-sm">
				<div className="p-4 pb-2 flex justify-between items-center">
					<img
						src="./nav-icon.png"
						className={`overflow-hidden transition-all ${
							open ? "w-10 h-10" : "w-0 h-0"
						}`}
						alt=""
					/>
					<h2
						className={`overflow-hidden transition-all text-lg font-bold text-green-700 drop-shadow-lg ${
							open ? "w-32" : "w-0"
						}`}
					>
						{t("title")}
					</h2>
					<button
						onClick={() => dispatch(barActions.toggle())}
						className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
					>
						{open ? <LuChevronFirst /> : <LuChevronLast />}
					</button>
				</div>

				<ul className="flex-1 px-3">{children}</ul>

				<div className="border-t flex p-3">
					<Avatar
						name="Shayan Ali"
						size={40}
						className="rounded-md"
					/>
					<div
						className={`flex justify-between items-center overflow-hidden transition-all ${
							open ? "w-52 ml-3" : "w-0"
						}`}
					>
						<div className="leading-4">
							<h4 className="font-semibold">Shayan Ali</h4>
							<span className="text-xs text-gray-600">
								shayanali1337
							</span>
						</div>
						<LuMoreVertical />
					</div>
				</div>
			</nav>
		</aside>
	);
}

export default Sidebar;

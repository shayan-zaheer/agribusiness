import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function UserSelection() {
	const { t } = useTranslation();
	return (
		<div className="h-screen w-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('./secondimage.png')" }}>
		<div className="h-screen w-screen flex flex-col justify-between text-white">
		  <main className="flex flex-col items-center justify-center flex-grow">
			<h2 className="text-5xl font-bold mb-36 -mt-60 drop-shadow-lg">
			  {t("who")}
			</h2>
			<div className="space-y-6">
			  <Link to="/register?user=seller" className="py-4">
				<button className="w-96 py-4 font-semibold bg-green-950 text-2xl border-2 border-black rounded-lg hover:bg-green-500 transition">
				  {t("seller")}
				</button>
			  </Link>
			  <br />
			  <br />
			  <Link to="/register?user=buyer">
				<button className="w-96 py-4 font-semibold bg-green-950 text-2xl border-2 border-black rounded-lg hover:bg-green-500 transition">
				  {t("buyer")}
				</button>
			  </Link>
			</div>
		  </main>
		</div>
	  </div>
	);
}

export default UserSelection;

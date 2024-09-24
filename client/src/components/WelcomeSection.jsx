import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function WelcomeSection() {
	const navigate = useNavigate();
    const {t} = useTranslation();

	const handleNavigate = () => {
		navigate("/users");
	};

	return (
		<section className="w-screen min-h-96 flex flex-row">
			<div className="w-2/4 flex flex-col items-start p-10 pt-10">
				<img className="w-40 " src="./nav-icon.png" alt="logo" />

				<h2 className=" text-4xl text-green-600 font-bold mb-3 mt-10 drop-shadow-lg">
					WELCOME TO
				</h2>
				<h1 className="text-green-500 text-5xl font-bold mb-3 drop-shadow-lg">
					{t("title")}
				</h1>
				<p className=" italic text-4xl mb-2 mt-4">
					{t("empowering farmers")},
					<br />
					{t("connecting buyers")}
				</p>
				<p className="italic text-4xl mb-14 mt-4">
					{t("home description")}
				</p>

				<button
					onClick={handleNavigate}
					className="ml-auto mt-auto text-5xl border-4 border-black rounded-full p-4 hover:bg-gray-300 transition"
				>
					➔
				</button>
			</div>

			<div className=" w-2/4 bg-field-image bg-cover bg-center min-h-96 "></div>
		</section>
	);
}

export default WelcomeSection;

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";



function WelcomeSection() {
	const navigate = useNavigate();
    const {t} = useTranslation();

	const handleNavigate = () => {
		navigate("/users");
	};

	return (
		<section className="w-screen h-[650px] flex flex-row">
      {/* Left Side */}
      <div className="w-2/4 flex flex-col items-start p-10 pt-10 bg-white">
        <h2 className="text-4xl text-green-600 font-bold mb-3 mt-10 drop-shadow-lg animate-fadeInDown">
          WELCOME TO
        </h2>
		<br />
		<br />
        <h1 className="text-green-500 text-7xl font-bold mb-3 drop-shadow-lg animate-fadeIn delay-200">
          {t("title")}
        </h1>
		<br /><br />
        <p className="italic text-4xl mb-2 mt-4 animate-scaleUp delay-400">
          {t("empowering farmers")},<br />
          {t("connecting buyers")}
        </p>
        <p className="italic text-4xl mb-14 mt-4 animate-scaleUp delay-600">
          {t("home description")}
        </p>
        <button
          onClick={handleNavigate}
          className="ml-auto mt-auto text-5xl border-4 border-black rounded-full p-4 hover:bg-green-500 transition animate-bounceOnHover"
        >
          ➔
        </button>
      </div>

      {/* Right Side with Image */}
      <div
        className="w-2/4 min-h-96 bg-cover bg-center animate-fadeInRight"
        style={{
          backgroundImage: "url('./firstimage.png')", // Replace with your image path
        }}
      ></div>
    </section>
	);
}

export default WelcomeSection;

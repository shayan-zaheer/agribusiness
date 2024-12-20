import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function WelcomeSection() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleNavigate = () => {
        navigate("/users");
    };

    return (
        <section className="w-screen h-[650px] md:h-[700px] flex flex-col md:flex-row">
            <div className="w-full md:w-2/4 flex flex-col items-start p-6 md:p-10 bg-white">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-green-600 font-bold mb-3 mt-10 drop-shadow-lg animate-fadeInDown">
                    WELCOME TO
                </h2>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl text-green-500 font-bold mb-3 drop-shadow-lg animate-fadeIn delay-200">
                    {t("title")}
                </h1>
                <p className="italic text-2xl sm:text-3xl lg:text-4xl mb-2 mt-4 animate-scaleUp delay-400">
                    {t("empowering farmers")},<br />
                    {t("connecting buyers")}
                </p>
                <p className="italic text-2xl sm:text-3xl lg:text-4xl mb-14 mt-4 animate-scaleUp delay-600">
                    {t("home description")}
                </p>
                <button
                    onClick={handleNavigate}
                    className="ml-auto mt-auto text-4xl sm:text-5xl md:text-6xl border-4 border-black rounded-full p-4 hover:bg-green-500 transition animate-bounceOnHover"
                >
                    ➔
                </button>
            </div>
            <div
                className="w-full md:w-2/4 min-h-96 bg-cover bg-center md:rounded-l-lg animate-fadeInRight"
                style={{
                    backgroundImage: "url('./firstimage.png')",
                }}
            ></div>
        </section>
    );
}

export default WelcomeSection;
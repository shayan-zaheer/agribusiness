import BuyerLogin from "../components/BuyerLogin";
import SellerLogin from "../components/SellerLogin";
import Footer from "../components/Footer";
import HeaderHuz from "../components/HeaderHuz";
import { ToastContainer } from "react-toastify";

function LoginPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

    return (
        <>
            <HeaderHuz />
            <ToastContainer />
            <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 lg:px-8">
                <div className="w-full max-w-md rounded-lg shadow-md p-2 sm:p-5 ">
                    {user === "seller" && <SellerLogin />}
                    {user === "buyer" && <BuyerLogin />}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;

import SellerRegistration from "../components/SellerRegistration";
import BuyerRegistration from "../components/BuyerRegistration";
import HeaderHuz from "../components/HeaderHuz";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

function RegisterPage() {
    const urlParams = new URLSearchParams(window.location.search);
	const user = urlParams.get("user");
	return (
        <>
            <HeaderHuz />
            <ToastContainer />
            {user === "seller" && <SellerRegistration />}
            {user === "buyer" && <BuyerRegistration />}
            <Footer />
        </>
    )
}

export default RegisterPage;

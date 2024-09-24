import FarmerRegistration from "../components/FarmerRegistration";
import BuyerRegistration from "../components/BuyerRegistration";
import HeaderHuz from "../components/HeaderHuz";
import Footer from "../components/Footer";

function RegisterPage() {
    const urlParams = new URLSearchParams(window.location.search);
	const user = urlParams.get("user");
	return (
        <>
            <HeaderHuz />
            {user === "farmer" && <FarmerRegistration />}
            {user === "buyer" && <BuyerRegistration />}
            <Footer />
        </>
    )
}

export default RegisterPage;

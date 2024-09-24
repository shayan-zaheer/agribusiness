import FarmerRegistration from "../components/FarmerRegistration";
import BuyerRegistration from "../components/BuyerRegistration";

function RegisterPage() {
    const urlParams = new URLSearchParams(window.location.search);
	const user = urlParams.get("user");
	return (
        <>
            {user === "farmer" && <FarmerRegistration />}
            {user === "buyer" && <BuyerRegistration />}
        </>
    )
}

export default RegisterPage;

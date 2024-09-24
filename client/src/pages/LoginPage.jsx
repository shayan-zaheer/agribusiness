import BuyerLogin from "../components/BuyerLogin";
import FarmerLogin from "../components/FarmerLogin";
import Footer from "../components/Footer";
import HeaderHuz from "../components/HeaderHuz";

function LoginPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

  return (
    <>
        <HeaderHuz />
        {user === "farmer" && <FarmerLogin />}
        {user === "buyer" && <BuyerLogin />}
        <Footer />
    </>
  )
}

export default LoginPage
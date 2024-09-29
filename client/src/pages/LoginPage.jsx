import BuyerLogin from "../components/BuyerLogin";
import SellerLogin from "../components/SellerLogin";
import Footer from "../components/Footer";
import HeaderHuz from "../components/HeaderHuz";

function LoginPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

  return (
    <>
        <HeaderHuz />
        {user === "seller" && <SellerLogin />}
        {user === "buyer" && <BuyerLogin />}
        <Footer />
    </>
  )
}

export default LoginPage
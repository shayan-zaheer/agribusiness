import { Outlet } from "react-router-dom";
import HeaderHuz from "../components/HeaderHuz";
import Footer from "../components/Footer";

function InitialPage() {
	return (
    <div className="flex flex-col min-h-screen">
      <HeaderHuz />
      <Outlet />
      <Footer />
    </div>
    )
}

export default InitialPage;

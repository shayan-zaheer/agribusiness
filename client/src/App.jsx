import { LuSettings } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SideItem from "./components/SideItem";

function App() {
	return (
        <>
            <Header />
            <div>
                <Sidebar>
                    <SideItem text="Profile" icon={<CgProfile/>}/>
                    <SideItem text="Orders" icon={<CiShoppingCart />}/>
                    <SideItem text="Settings" icon={<LuSettings />}/>
                </Sidebar>
            </div>
        </>
    );
}

export default App;

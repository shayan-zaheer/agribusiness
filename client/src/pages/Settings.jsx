import { Link, Outlet } from "react-router-dom";
import {
    FaBox,
    FaEdit,
    FaTrash,
    FaUserEdit,
    FaLock,
    FaBars,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";

function Settings() {
    const { role } = useSelector((store) => store.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row">
            <aside
                className={`${
                    isSidebarOpen ? "w-[250px]" : "w-0"
                } md:w-[250px] bg-green-600 p-8 flex flex-col space-y-6 transition-all duration-300 ease-in-out overflow-hidden`}
            >
                <h2 className="text-2xl text-white font-semibold">Settings</h2>
                <nav className="space-y-4">
                    {role === "seller" && (
                        <>
                            <Link
                                to="/settings/add-product"
                                className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-100 hover:text-black transition-colors"
                            >
                                <FaBox className="mr-3" /> Add Product
                            </Link>
                            <Link
                                to="/settings/update-product"
                                className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-100 hover:text-black transition-colors"
                            >
                                <FaEdit className="mr-3" /> Update Product
                            </Link>
                            <Link
                                to="/settings/delete-product"
                                className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-100 hover:text-black transition-colors"
                            >
                                <FaTrash className="mr-3" /> Delete Product
                            </Link>
                        </>
                    )}
                    <Link
                        to="/settings/change-username"
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-100 hover:text-black transition-colors"
                    >
                        <FaUserEdit className="mr-3" /> Change Username
                    </Link>
                    <Link
                        to="/settings/change-password"
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-100 hover:text-black transition-colors"
                    >
                        <FaLock className="mr-3" /> Change Password
                    </Link>
                </nav>
            </aside>

            <main
                className={`flex-1 p-6 md:p-10 ${
                    isSidebarOpen ? "ml-[250px]" : ""
                }`}
            >
                <div className="md:hidden mb-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-3xl text-green-600"
                    >
                        <FaBars />
                    </button>
                </div>
                <Outlet context={[role]} />
            </main>
        </div>
    );
}

export default Settings;

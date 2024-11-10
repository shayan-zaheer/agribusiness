import { Link, Outlet } from "react-router-dom";
import { FaBox, FaEdit, FaTrash, FaUserEdit, FaLock, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";

function Settings() {
    const { role } = useSelector((store) => store.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside
                className={`${
                    isSidebarOpen ? "w-[250px]" : "hidden"
                } md:w-[250px] bg-green-600 p-8 flex flex-col space-y-6 transition-all duration-300 ease-in-out overflow-hidden fixed md:relative top-0 left-0 h-full z-10`}
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

            {/* Main Content */}
            <main
                className={`flex-1 p-6 md:p-10 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "ml-[250px]" : "ml-0"
                }`}
            >
                {/* Hamburger Button (Only on mobile) */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-3xl text-green-600"
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Render Outlet (child routes) */}
                <Outlet context={[role]} />
            </main>
        </div>
    );
}

export default Settings;

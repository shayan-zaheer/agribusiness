import { Link, Outlet } from "react-router-dom";
import { FaBox, FaEdit, FaTrash, FaUserEdit, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";

function Settings() {
    const {role} = useSelector(store => store.user);

    return (
        <div className="min-h-screen bg-gray-300 flex">
            <aside className="w-[18%] bg-green-600 p-8 flex flex-col space-y-6">
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


            <main className="w-3/4 p-10">
                <Outlet context={[role]}/>
            </main>
        </div>
    );
}

export default Settings;
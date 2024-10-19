import { Link } from "react-router-dom";
import { FaBox, FaEdit, FaTrash, FaUserEdit, FaLock } from "react-icons/fa";

function Settings() {
    return (
        <div className="min-h-screen bg-[rgb(55,97,55)] flex">

            <aside className="w-[18%] bg-green-800 p-8 flex flex-col space-y-6">
                <h2 className="text-2xl text-white font-semibold">Settings</h2>
                <nav className="space-y-4">
                    <Link 
                        to="/settings/add-product" 
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaBox className="mr-3" /> Add Product
                    </Link>
                    <Link 
                        to="/settings/update-product" 
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaEdit className="mr-3" /> Update Product
                    </Link>
                    <Link
                        to="/settings/delete-product" 
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaTrash className="mr-3" /> Delete Product
                    </Link>
                    <Link 
                        to="/settings/change-username" 
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaUserEdit className="mr-3" /> Change Username
                    </Link>
                    <Link 
                        to="/settings/change-password" 
                        className="flex items-center py-2 px-4 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <FaLock className="mr-3" /> Change Password
                    </Link>
                </nav>
            </aside>

            {/* Main content area */}
            <main className="w-3/4 p-10">
                <h1 className="text-4xl font-bold text-white mb-8">Manage Your Settings</h1>
                
                {/* Settings Options as Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link to="/settings/add-product" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center bg-green-200 rounded-full w-12 h-12 mb-4">
                            <FaBox className="text-green-700 text-2xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-green-800">Add Product</h2>
                        <p className="text-gray-600 mt-2">Add a new product to the inventory.</p>
                    </Link>

                    <Link to="/settings/update-product" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center bg-green-200 rounded-full w-12 h-12 mb-4">
                            <FaEdit className="text-green-700 text-2xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-green-800">Update Product</h2>
                        <p className="text-gray-600 mt-2">Edit existing product details.</p>
                    </Link>

                    <Link to="/settings/delete-product" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center bg-green-200 rounded-full w-12 h-12 mb-4">
                            <FaTrash className="text-green-700 text-2xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-green-800">Delete Product</h2>
                        <p className="text-gray-600 mt-2">Remove a product from inventory.</p>
                    </Link>

                    <Link to="/settings/change-username" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center bg-green-200 rounded-full w-12 h-12 mb-4">
                            <FaUserEdit className="text-green-700 text-2xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-green-800">Change Username</h2>
                        <p className="text-gray-600 mt-2">Modify your account username.</p>
                    </Link>

                    <Link to="/settings/change-password" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center bg-green-200 rounded-full w-12 h-12 mb-4">
                            <FaLock className="text-green-700 text-2xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-green-800">Change Password</h2>
                        <p className="text-gray-600 mt-2">Update your account password.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Settings;
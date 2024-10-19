function SettingsNav() {
    return (
        <>
            <h1 className="text-4xl font-bold text-white mb-8">
                Manage Your Settings
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link
                    to="/settings/add-product"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                        <FaBox className="text-gray-700 text-2xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Product
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Add a new product to the inventory.
                    </p>
                </Link>

                <Link
                    to="/settings/update-product"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                        <FaEdit className="text-gray-700 text-2xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Update Product
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Edit existing product details.
                    </p>
                </Link>

                <Link
                    to="/settings/delete-product"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                        <FaTrash className="text-gray-700 text-2xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Delete Product
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Remove a product from inventory.
                    </p>
                </Link>

                <Link
                    to="/settings/change-username"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                        <FaUserEdit className="text-gray-700 text-2xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Change Username
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Modify your account username.
                    </p>
                </Link>

                <Link
                    to="/settings/change-password"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                        <FaLock className="text-gray-700 text-2xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Change Password
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Update your account password.
                    </p>
                </Link>
            </div>
        </>
    );
}

export default SettingsNav;

import { Link } from "react-router-dom";

function Settings() {
    return (
        <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-green-800 mb-8">Settings</h1>
            <div className="space-y-4">
                <Link to="/settings/add-product" className="block py-3 px-5 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 text-center">
                    Add Product
                </Link>
                <Link to="/settings/update-product" className="block py-3 px-5 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 text-center">
                    Update Product
                </Link>
                <Link to="/settings/delete-product" className="block py-3 px-5 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 text-center">
                    Delete Product
                </Link>
                <Link to="/settings/change-username" className="block py-3 px-5 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 text-center">
                    Change Username
                </Link>
                <Link to="/settings/change-password" className="block py-3 px-5 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 text-center">
                    Change Password
                </Link>
            </div>
        </div>
    );
}

export default Settings;
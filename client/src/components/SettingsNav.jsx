import { Link, useOutletContext } from "react-router-dom";
import { FaBox, FaEdit, FaTrash, FaUserEdit, FaLock } from "react-icons/fa";

function SettingsNav() {
  const [role] = useOutletContext(); // Retrieve the role context passed from Settings

  return (
    <>
      <h1 className="text-4xl font-bold text-green-600 mb-8 text-center md:text-left">
        Manage Your Settings
      </h1>

      {/* Grid layout for settings options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {role === "seller" && (
          <>
            <Link
              to="/settings/add-product"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                <FaBox className="text-green-500 text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Add Product
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Add a new product to the inventory.
              </p>
            </Link>

            <Link
              to="/settings/update-product"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                <FaEdit className="text-green-500 text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Update Product
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Edit existing product details.
              </p>
            </Link>

            <Link
              to="/settings/delete-product"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
                <FaTrash className="text-green-500 text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Delete Product
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Remove a product from inventory.
              </p>
            </Link>
          </>
        )}

        {/* Common Settings Links */}
        <Link
          to="/settings/change-username"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center"
        >
          <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
            <FaUserEdit className="text-green-500 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Change Username
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            Modify your account username.
          </p>
        </Link>

        <Link
          to="/settings/change-password"
          className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-xl transition-shadow flex flex-col items-center"
        >
          <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 mb-4">
            <FaLock className="text-green-500 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Change Password
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            Update your account password.
          </p>
        </Link>
      </div>
    </>
  );
}

export default SettingsNav;

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
    const { t } = useTranslation();
    const { role } = useSelector((store) => store.user);

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 p-5">
            <div className="flex flex-col justify-between h-full">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md shadow-sm mb-4"
                />
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t("product name")}: {product.name}</h2>
                    <p className="text-gray-600 mb-2">
                        <strong>{t("description")}:</strong> {product.description}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>{t("price")}:</strong> Rs. {product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>{t("quantity available")}:</strong> {product.quantityAvailable}
                    </p>
                    <p className="text-gray-600">
                        <strong>{t("category")}:</strong> {product.category}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <Link
                        to={`/products/product/${product._id}`}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        {t("view product")}
                    </Link>
                    {role === "buyer" && (
                        <Link
                            to={`/messages/${product?.seller?._id}`}
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            {t("contact seller")}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;

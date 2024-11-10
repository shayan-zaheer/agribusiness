import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductItem({ product }) {
    const { t } = useTranslation();
    const { _id: id, role } = useSelector((store) => store.user);

    const handleAddToCart = async (product) => {
        try {
            if(id){
                const response = await axios.post(
                    "http://localhost:8000/cart/add-to-cart",
                    {
                        userId: id,
                        productId: product._id,
                        quantity: 1,
                    },
                    {
                       withCredentials: true
                    }
                );

                console.log(response);
            }

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex bg-[rgb(167,217,167)] rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex-1">
                <h1 className="text-xl font-bold mb-2">
                    {t("Farmer Name")}: Example
                </h1>
                <h2 className="text-xl font-bold mb-2">
                    {t("Product Name")}: {product.name}
                </h2>
                <p className="text-gray-700 mb-1">
                    <strong>{t("Description")}:</strong> {product.description}
                </p>
                <p className="text-gray-700 mb-1">
                    <strong>{t("Price")}:</strong> ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-700 mb-1">
                    <strong>{t("Quantity Available")}:</strong>{" "}
                    {product.quantityAvailable}
                </p>
                <p className="text-gray-700 mb-1">
                    <strong>{t("Category")}:</strong> {product.category}
                </p>
            </div>
            <div className="flex flex-col items-end">
                <img
                    className="w-32 h-32 mb-2 object-cover rounded-md shadow-sm"
                    src={product.image}
                    alt={product.name}
                />
                {role === "buyer" && (
                    <div className="flex gap-2">
                        <button
                            className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            onClick={() => handleAddToCart(product)}
                            >
                            
                            <strong>{t("Add To Cart")}</strong>
                        </button>

                        <Link
                            to={`/messages/${product?.seller?._id}`}
                            className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition-colors duration-200"
                        >
                            <strong>{t("Contact Seller")}</strong>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductItem;

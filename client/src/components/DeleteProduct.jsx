import { useState } from "react";
import axios from "axios";
import { Form, useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import FetchProducts from "./FetchProducts";

function DeleteProduct() {
    const products = useSelector((store) => store.product.products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [role] = useOutletContext();
    const navigate = useNavigate();

    const handleProductSelect = (event) => {
        const productId = event.target.value;
        const product = products.find(prod => prod._id === productId);
        setSelectedProduct(product);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedProduct) {
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            const result = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/delete/${selectedProduct._id}`, { withCredentials: true });
            setLoading(false);

            if (result.data.status === "success") {
                navigate("/settings");
            } else {
                setError("Failed to delete the product. Please try again.");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            setError("An error occurred while deleting the product.");
        }
    };

    return (
        <>
            <FetchProducts />
            {role === "seller" && (
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Delete Product</h1>

                    <Form onSubmit={handleSubmit}>
                        <select
                            onChange={handleProductSelect}
                            className="block w-full p-3 border border-gray-300 rounded mb-4"
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className={`bg-red-600 text-white py-2 px-4 rounded ${!selectedProduct ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!selectedProduct || loading}
                        >
                            {loading ? "Deleting..." : "Delete Product"}
                        </button>
                    </Form>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            )}
        </>
    );
}

export default DeleteProduct;

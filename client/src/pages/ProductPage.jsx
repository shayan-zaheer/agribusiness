import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/product/${productId}`);
                setProduct(response.data.data.product[0]);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
                <p className="ml-4 text-gray-400">Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-red-600 text-xl">{error}</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
            <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="lg:w-1/2">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-80 object-cover" 
                    />
                </div>
                <div className="lg:w-1/2 p-6">
                    <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-2"><strong>Description:</strong> {product.description}</p>
                    <p className="text-lg text-gray-700 mb-2"><strong>Price:</strong> Rs. {product.price.toFixed(2)}</p>
                    <p className="text-lg text-gray-700 mb-2"><strong>Quantity Available:</strong> {product.quantityAvailable}</p>
                    <p className="text-lg text-gray-700 mb-4"><strong>Category:</strong> {product.category}</p>

                    <div className="flex items-center mb-4">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                            Checkout
                        </button>
                        <span className="text-gray-600 ml-4">Free shipping on orders over Rs. 1000!</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <div className="border-t pt-4">
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <img src="https://via.placeholder.com/150" alt="Related Product" className="w-full h-32 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">Related Product Name</h3>
                        <p className="text-gray-600">Rs. 999.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <img src="https://via.placeholder.com/150" alt="Related Product" className="w-full h-32 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">Related Product Name</h3>
                        <p className="text-gray-600">Rs. 999.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <img src="https://via.placeholder.com/150" alt="Related Product" className="w-full h-32 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">Related Product Name</h3>
                        <p className="text-gray-600">Rs. 999.99</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;

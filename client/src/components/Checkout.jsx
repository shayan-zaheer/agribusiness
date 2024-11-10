import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { _id: userId } = useSelector((store) => store.user);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`http://localhost:8000/cart/view-cart/${userId}`);
                setCartItems(response.data.cart);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setError("Failed to load cart items.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId]);

    const handleProceedToCheckout = () => {
        console.log("Proceeding to checkout...");
        navigate("/checkout/payment");
    };

    if (loading) {
        return <div>Loading your cart...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {cartItems.length === 0 ? (
                <div className="text-center text-xl text-gray-500">Your cart is empty.</div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.product._id} className="flex bg-[rgb(167,217,167)] rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex-1">
                            <h1 className="text-xl font-bold mb-2">
                                Farmer Name: {item.product.sellerName}
                            </h1>
                            <h2 className="text-xl font-bold mb-2">
                                Product Name: {item.product.name}
                            </h2>
                            <p className="text-gray-800 mb-1">
                                <strong>Description:</strong> {item.product.description}
                            </p>
                            <p className="text-gray-800 mb-1">
                                <strong>Price:</strong> ${item.product.price.toFixed(2)}
                            </p>
                            <p className="text-gray-800 mb-1">
                                <strong>Quantity Available:</strong> {item.product.quantityAvailable}
                            </p>
                            <p className="text-gray-800 mb-1">
                                <strong>Category:</strong> {item.product.category}
                            </p>
                            <p className="text-gray-800 mb-1">
                                <strong>Enter Your Desired Quantity:</strong>
                                <input
                                    className="rounded-sm"
                                    type="number"
                                    name="buyerquantity"
                                    id="buyerquantity"
                                    min="1"
                                    max={item.product.quantityAvailable}
                                    defaultValue={item.quantity}
                                />
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <img
                                className="w-32 h-32 mb-2 object-cover rounded-md shadow-sm"
                                src={item.product.image}
                                alt="product"
                            />
                            <div className="flex gap-2">
                                <button className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition-colors duration-200">
                                    <strong>Contact Seller</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className="flex justify-center mt-5 transform transition-transform duration-200 hover:scale-105">
                <button
                    className="bg-green-500 text-black font-bold border-2 p-3 rounded-md m-auto"
                    onClick={handleProceedToCheckout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Checkout;

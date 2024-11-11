import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewCart() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const {_id: id} = useSelector((store) => store.user);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const userId = id;
                if(id){
                    const response = await axios.get(`http://localhost:8000/cart/view-cart/${userId}`);
                    setCart(response.data.cart);

                    const total = response.data.cart.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                    );
                    setTotalPrice(total);
                }

            } catch (error) {
                console.error("Error fetching cart:", error);
                setCart([]);
            }
        };

        fetchCart();
    }, [id]);

    const handleRemoveFromCart = async (productId) => {
        try {
            if(id){
                const response = await axios.post(
                    "http://localhost:8000/cart/remove-from-cart",
                    {
                        userId: id,
                        productId: productId
                    },
                    {
                       withCredentials: true
                    }
                );
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Your Shopping Cart</h1>
            
            {cart.length === 0 ? (
                <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cart.map((item) => (
                        <div
                            key={item.product._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col p-4">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.product.name}</h2>
                                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                                <p className="text-gray-600 mb-4">Price: ${item.product.price.toFixed(2)}</p>
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.product._id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                                    >
                                        Remove
                                    </button>
                                    <p className="font-semibold text-lg text-gray-800">
                                        ${item.product.price * item.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="mt-6 flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                    <Link
                        to="/checkout/payment"
                        className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ViewCart;

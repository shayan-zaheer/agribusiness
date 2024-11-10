import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Payment() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const { _id: userId } = useSelector(store => store.user);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (!userId) return;
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/view-cart/${userId}`);
                const fetchedCartItems = response.data.cart;
                setCartItems(fetchedCartItems);
                const total = fetchedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleSelectPayment = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row bg-[rgb(167,217,167)] rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200">
                <div className="flex-1 mb-6 lg:mb-0">
                    <h1 className="text-xl font-bold mb-2">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-800">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product._id} className="mb-4">
                                <h2 className="text-lg font-bold">{item.product.name}</h2>
                                <p className="text-gray-800 mb-1"><strong>Price:</strong> ${item.product.price.toFixed(2)}</p>
                                <p className="text-gray-800 mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                                <p className="text-gray-800 mb-1"><strong>Total for Item:</strong> ${item.product.price * item.quantity}</p>
                            </div>
                        ))
                    )}
                    <br />
                    <p className="text-green-900 mb-1 font-extrabold">
                        <strong>Total Bill:</strong> ${totalPrice.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-col items-end">
                    {cartItems.length > 0 && (
                        <img
                            className="w-32 h-32 mb-2 object-cover rounded-md shadow-sm"
                            src={cartItems[0].product.image}
                            alt={cartItems[0].product.name}
                        />
                    )}
                </div>
            </div>
            <div className="rounded-lg shadow-md p-4 m-5 hover:shadow-lg transition-shadow duration-200 bg-slate-200">
                <label htmlFor="" className="font-extrabold text-3xl mb-6 block">
                    Pay Via
                </label>

                <div className="flex gap-8 mt-9 justify-center">
                    <img
                        src="src/assets/Easypaisa-logo.png"
                        alt="Easypaisa Logo"
                        onClick={() => handleSelectPayment("easypaisa")}
                        className={`w-24 h-12 object-contain cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedPaymentMethod === "easypaisa" ? "border-2 border-blue-500 rounded-lg" : ""}`}
                    />
                    <img
                        src="src/assets/Jazzcash-logo.png"
                        alt="Jazzcash Logo"
                        onClick={() => handleSelectPayment("jazzcash")}
                        className={`w-24 h-12 object-contain cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedPaymentMethod === "jazzcash" ? "border-2 border-blue-500 rounded-lg" : ""}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default Payment;

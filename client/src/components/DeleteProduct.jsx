import { useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

function DeleteProduct() {
    const [productId, setProductId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const result = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/delete/${productId}`);
            setLoading(false);

            if (result.data.status === "success") {
                navigate("/settings");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Delete Product</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded">
                    Delete Product
                </button>
            </Form>
        </div>
    );
}

export default DeleteProduct;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import inputField from "./fields/inputField";
import textareaField from "./fields/textareaField";

function AddProduct() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { name, description, price, quantityAvailable, category } = Object.fromEntries(formData.entries());

        try {
            setLoading(true);
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/add`,  { name, description, price, quantityAvailable, category });
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Add Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input fields */}
                    <inputField label="Product Name" name="name" />
                    <textareaField label="Description" name="description" />
                    <inputField label="Price" name="price" type="number" />
                    <inputField label="Quantity Available" name="quantityAvailable" type="number" />
                    <inputField label="Category" name="category" />

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;

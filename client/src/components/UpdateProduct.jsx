import { useState } from "react";
import axios from "axios";
import InputField from "./fields/inputField";
import TextareaField from "./fields/textareaField";

function UpdateProduct() {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { productId, name, description, price, quantityAvailable, category } = Object.fromEntries(formData.entries());

        try {
            setLoading(true);
            const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/update/${productId}`, {
                name, description, price: Number(price), quantityAvailable: Number(quantityAvailable), category
            });
            setLoading(false);
            console.log(result.data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Update Product</h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <InputField label="Product ID" name="productId" />
                    <InputField label="Product Name" name="name" />
                    <TextareaField label="Description" name="description" />
                    <InputField label="Price" name="price" type="number" />
                    <InputField label="Quantity Available" name="quantityAvailable" type="number" />
                    <InputField label="Category" name="category" />

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
                    >
                        {loading ? "Updating Product..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;

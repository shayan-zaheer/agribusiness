import { useState } from "react";
import axios from "axios";
import InputField from "./fields/inputField";

function DeleteProduct() {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { productId } = Object.fromEntries(formData.entries());

        try {
            setLoading(true);
            const result = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/delete/${productId}`);
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
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Delete Product</h2>
                <form onSubmit={handleDelete} className="space-y-6">
                    <InputField label="Product ID" name="productId" />

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-md shadow-sm"
                    >
                        {loading ? "Deleting Product..." : "Delete Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeleteProduct;

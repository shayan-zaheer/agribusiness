import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, useNavigate } from "react-router-dom";

function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null); // State to store the selected file
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target); // Use FormData to handle multipart form data
        const { name, description, price, quantityAvailable, category } = Object.fromEntries(formData.entries());

        // Manually append the file to the FormData object
        formData.append("image", file);

        try {
            setLoading(true);
            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/products/add`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setLoading(false);

            if (result.data.status === "success") {
                toast.success("Product added successfully");
                navigate("/settings");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Failed to add product");
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="quantityAvailable"
                    placeholder="Quantity Available"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />

                <label className="cursor-pointer block w-full p-3 border border-gray-300 rounded mb-4">
                    Open File
                    <input
                        name="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </label>

                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded" disabled={loading}>
                    {loading ? "Adding Product..." : "Add Product"}
                </button>
            </Form>
        </div>
    );
}

export default AddProduct;

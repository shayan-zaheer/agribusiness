import { useState, useEffect } from "react";
import axios from "axios";
import { Form, useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
                setProductData(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        // fetchProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { name, description, price, quantityAvailable, category } = Object.fromEntries(formData.entries());

        try {
            setLoading(true);
            const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/update/${id}`, { name, description, price, quantityAvailable, category });
            setLoading(false);

            if (result.data.status === "success") {
                navigate("/settings");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    // if (!productData) return <div>Loading...</div>;

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Update Product</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    defaultValue={productData.name}
                    placeholder="Product Name"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <textarea
                    name="description"
                    defaultValue={productData.description}
                    placeholder="Product Description"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="price"
                    defaultValue={productData.price}
                    placeholder="Price"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="quantityAvailable"
                    defaultValue={productData.quantityAvailable}
                    placeholder="Quantity Available"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="category"
                    defaultValue={productData.category}
                    placeholder="Category"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    Update Product
                </button>
            </Form>
        </div>
    );
}

export default UpdateProduct;

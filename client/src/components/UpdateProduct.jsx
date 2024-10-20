import { useState, useEffect } from "react";
import axios from "axios";
import { Form, useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdateProduct() {
    const [loading, setLoading] = useState(false);
    const products = useSelector(store => store.product.products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {_id: id} = useSelector(store => store.user);
    const [role] = useOutletContext();
    const navigate = useNavigate();

    console.log(products);
    console.log(id);

    const handleProductSelect = (event) => {
        const productId = event.target.value;
        const product = products.find(prod => prod._id === productId);
        setSelectedProduct(product);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { name, description, price, quantityAvailable, category } = Object.fromEntries(formData.entries());

        try {
            setLoading(true);
            const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/update/${selectedProduct._id}`, {
                name,
                description,
                price,
                quantityAvailable,
                category
            });
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
        <>
            {role === "seller" && (
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Update Product</h1>

                    <select onChange={handleProductSelect} className="block w-full p-3 border border-gray-300 rounded mb-4">
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </select>

                    {selectedProduct && (
                        <Form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectedProduct.name}
                                placeholder="Product Name"
                                className="block w-full p-3 border border-gray-300 rounded mb-4"
                                required
                            />
                            <textarea
                                name="description"
                                defaultValue={selectedProduct.description}
                                placeholder="Product Description"
                                className="block w-full p-3 border border-gray-300 rounded mb-4"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                defaultValue={selectedProduct.price}
                                placeholder="Price"
                                className="block w-full p-3 border border-gray-300 rounded mb-4"
                                required
                            />
                            <input
                                type="number"
                                name="quantityAvailable"
                                defaultValue={selectedProduct.quantityAvailable}
                                placeholder="Quantity Available"
                                className="block w-full p-3 border border-gray-300 rounded mb-4"
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                defaultValue={selectedProduct.category}
                                placeholder="Category"
                                className="block w-full p-3 border border-gray-300 rounded mb-4"
                                required
                            />
                            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                                Update Product
                            </button>
                        </Form>
                    )}
                </div>
            )}
        </>
    );
}

export default UpdateProduct;

import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Settings() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const {
            name,
            description,
            price,
            quantityAvailable,
            category,
        } = Object.fromEntries(formData.entries());

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/userdata`,
                { withCredentials: true }
            );
            const id = response.data.user._id;

            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/products/add`, // Update this URL as needed
                {
                    name,
                    description,
                    price: Number(price),
                    quantityAvailable: Number(quantityAvailable),
                    category,
                    seller: id,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(result);
            const data = result.data;

            if (data.status === "success") {
                // navigate("/products"); //
            } else {
                console.log(data);
            }
        } catch (err) {
            return console.error(err);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="bg-[#D9D9D9] h-[90%] min-h-fit rounded-lg w-[40%] md:w-[70%] sm:min-w-fit max-w-[600px] md:h-auto my-20 mx-auto flex flex-grow flex-col justify-around items-center p-2 opacity-75"
        >
            <div className="application min-h-fit h-3/4">
                <h1 className="text-4xl font-bold text-center mb-10">Add Product</h1>
                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="name"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    />
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="description"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        required
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    ></textarea>
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="price"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        required
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    />
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="quantityAvailable"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Quantity Available
                    </label>
                    <input
                        type="number"
                        name="quantityAvailable"
                        required
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    />
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="category"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#6E9794] hover:bg-[#70aca8] text-white font-bold py-2 px-4 rounded w-1/2 md:w-1/2 mt-4"
                >
                    Add Product
                </button>
                <div className="mt-4 text-center">
                    <Link to="/products" className="text-blue-600 underline">
                        Back to Products
                    </Link>
                </div>
            </div>
        </Form>
    );
}

export default Settings;

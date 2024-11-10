import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SellerRegistration({ cities, selectedCity, setSelectedCity }) {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const { name, username, password, mobile, city } = Object.fromEntries(
            formData.entries()
        );
        const role = new URLSearchParams(window.location.search).get("user");

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
                {
                    name,
                    username,
                    password,
                    role,
                    mobile,
                    city,
                }
            );

            toast.success(`${name} has been registered! Kindly login!`, {
                theme: "dark",
                position: "bottom-right",
            });

            navigate("/login?user=seller");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/secondimage.png')" }}
        >
            <Form
                onSubmit={handleSubmit}
                className="bg-[#D9D9D9] h-[90%] min-h-fit rounded-lg w-[40%] md:w-[70%] sm:min-w-fit max-w-[600px] md:h-auto my-20 mx-auto flex flex-grow flex-col justify-around items-center p-6 opacity-90 shadow-lg"
            >
                <div className="application min-h-fit h-3/4">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Create Seller Account
                    </h1>
                    <div className="flex flex-col w-3/4">
                        <label
                            htmlFor="name"
                            className="font-Poppins font-bold text-left mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="w-full rounded border border-gray-400 py-2 px-3"
                        />
                    </div>

                    <div className="flex flex-col w-3/4">
                        <label
                            htmlFor="username"
                            className="font-Poppins font-bold text-left mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="w-full rounded border border-gray-400 py-2 px-3"
                        />
                    </div>

                    <div className="flex flex-col w-3/4">
                        <label
                            htmlFor="password"
                            className="font-Poppins font-bold text-left mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full rounded border border-gray-400 py-2 px-3"
                        />
                    </div>

                    <div className="flex flex-col w-3/4">
                        <label
                            htmlFor="mobile"
                            className="font-Poppins font-bold text-left mb-2"
                        >
                            Mobile Number
                        </label>
                        <input
                            type="number"
                            name="mobile"
                            className="w-full rounded border border-gray-400 py-2 px-3"
                        />
                    </div>

                    <div className="flex flex-col w-3/4">
                        <label
                            htmlFor="city"
                            className="font-Poppins font-bold text-left mb-2"
                        >
                            Select City
                        </label>
                        <select
                            name="city"
                            value={selectedCity}
                            onChange={(event) =>
                                setSelectedCity(event.target.value)
                            }
                            required
                            className="w-full rounded border border-gray-400 py-2 px-3"
                        >
                            <option value="">Select a city</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#4eb0aa] hover:bg-[#225855] text-white font-bold py-2 px-4 rounded w-1/2 md:w-1/2 mt-4 ml-10"
                    >
                        Register
                    </button>

                    <div className="mt-4 ml-5">
                        Already Have An Account?{" "}
                        <Link
                            to="/login?user=seller"
                            className="text-blue-600 underline"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default SellerRegistration;

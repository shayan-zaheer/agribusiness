import { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SellerRegistration() {
    const [profilePicture, setProfilePicture] = useState("");

    const handleFileChange = async (event) => {
        const picture = await converttobase64(event.target.files[0]);
        setProfilePicture(picture);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const {
            name,
            username,
            password,
            mobile,
            farmName,
            farmLocation,
            cropsProduced,
        } = Object.fromEntries(formData.entries());
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
                    farmName,
                    farmLocation,
                    cropsProduced,
                }
            );

            toast.success(
                `${name} has been registered! Kindly login!`,
                {
                    theme: "dark",
                    position: "bottom-right",
                }
            );

            return redirect("/login?user=seller");
        } catch (err) {
            return console.error(err);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="bg-[#D9D9D9] h-[90%] min-h-fit  rounded-lg w-[40%] md:w-[70%] sm:min-w-fit max-w-[600px] md:h-auto my-20 mx-auto flex flex-grow flex-col
     justify-around items-center p-2 opacity-75"
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
                    ></input>
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
                    ></input>
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
                    ></input>
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
                    ></input>
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="farmName"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Farm Name
                    </label>
                    <input
                        type="text"
                        name="farmName"
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    ></input>
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="farmLocation"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Farm Location
                    </label>
                    <input
                        type="text"
                        name="farmLocation"
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    ></input>
                </div>

                <div className="flex flex-col w-3/4">
                    <label
                        htmlFor="cropsProduced"
                        className="font-Poppins font-bold text-left mb-2"
                    >
                        Crops produced
                    </label>
                    <input
                        type="text"
                        name="cropsProduced"
                        className="w-full rounded border border-gray-400 py-2 px-3"
                    ></input>
                </div>

                <button
                    type="submit"
                    className="bg-[#6E9794] hover:bg-[#70aca8] text-white font-bold py-2 px-4 rounded w-1/2 md:w-1/2 mt-4"
                >
                    Register
                </button>
                <div className="mt-4 text-center">
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
    );
}

export default SellerRegistration;

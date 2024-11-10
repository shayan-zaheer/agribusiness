import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SellerLogin() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        console.log(Object.fromEntries(formData.entries()));

        const {
            username,
            password
        } = Object.fromEntries(formData.entries());

        const role = new URLSearchParams(window.location.search).get("user");
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                {
                    username,
                    password,
                    role
                }, {
                    withCredentials: true
                }
            );

            console.log(result);
            const data = result.data;
            
            if (data.status === "success") {
                localStorage.setItem("token", data.token);
                navigate("/profile");
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
		className="bg-[#D9D9D9] rounded-lg w-full max-w-md mx-auto my-10 p-6 sm:p-8 flex flex-col justify-around items-center opacity-75"
	>
		<div className="w-full">
			<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">Login</h1>
			
			<div className="flex flex-col w-full mb-4">
				<label
					htmlFor="username"
					className="font-Poppins font-bold text-left mb-2 text-sm sm:text-base"
				>
					User Name
				</label>
				<input
					type="text"
					name="username"
					className="w-full rounded border border-gray-400 py-2 px-3 text-sm sm:text-base"
				/>
			</div>

			<div className="flex flex-col w-full mb-4">
				<label
					htmlFor="password"
					className="font-Poppins font-bold text-left mb-2 text-sm sm:text-base"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					className="w-full rounded border border-gray-400 py-2 px-3 text-sm sm:text-base"
				/>
			</div>

			<button
				type="submit"
				className="bg-[#6E9794] hover:bg-[#70aca8] text-white font-bold py-2 px-4 rounded w-full sm:w-1/2 mt-4"
			>
				Login
			</button>
			
			<div className="mt-4 text-center">
				Don't Have An Account?{" "}
				<Link to="/register?user=buyer" className="text-blue-600 underline">
					Register
				</Link>
			</div>
		</div>
	</Form>
    );
}

export default SellerLogin;

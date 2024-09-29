import {useState} from "react";
import { Link } from "react-router-dom";

function SellerRegistration() {
	const [profilePicture, setProfilePicture] = useState("");

	const handleFileChange = async (event) => {
		const picture = await converttobase64(event.target.files[0]);
		setProfilePicture(picture);
	};
	return (
			<form
				className="bg-[#D9D9D9] h-[90%] min-h-fit  rounded-lg w-[40%] md:w-[70%] sm:min-w-fit max-w-[600px] md:h-auto my-20 mx-auto flex flex-grow flex-col
     justify-around items-center p-2 opacity-75"
			>
				<div className="application min-h-fit h-3/4">
					<h1 className="text-4xl font-bold text-center mb-10">
						Create Seller Account
					</h1>
					<div className="flex flex-col w-3/4">
						<label
							htmlFor="cnic"
							className="font-Poppins font-bold text-left mb-2"
						>
							Full Name
						</label>
						<input
							type="text"
							name="cnic"
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
							htmlFor="mobileno"
							className="font-Poppins font-bold text-left mb-2"
						>
							Mobile Number
						</label>
						<input
							type="number"
							name="mobileno"
							className="w-full rounded border border-gray-400 py-2 px-3"
						></input>
					</div>

					<div className="flex flex-col w-3/4">
						<label
							htmlFor="Farmname"
							className="font-Poppins font-bold text-left mb-2"
						>
							Farm Name
						</label>
						<input
							type="text"
							name="Farmname"
							className="w-full rounded border border-gray-400 py-2 px-3"
						></input>
					</div>

					<div className="flex flex-col w-3/4">
						<label
							htmlFor="location"
							className="font-Poppins font-bold text-left mb-2"
						>
							Farm Location
						</label>
						<input
							type="text"
							name="location"
							className="w-full rounded border border-gray-400 py-2 px-3"
						></input>
					</div>

					<div className="flex flex-col w-3/4">
						<label
							htmlFor="location"
							className="font-Poppins font-bold text-left mb-2"
						>
							Crops produced
						</label>
						<input
							type="text"
							name="location"
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
			</form>
	);
}

export default SellerRegistration;

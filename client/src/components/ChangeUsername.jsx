// import { useState } from "react";
// import axios from "axios";
// import InputField from "./fields/inputField";

// function ChangeUsername() {
//     const [loading, setLoading] = useState(false);

//     const handleChange = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const { newUsername } = Object.fromEntries(formData.entries());

//         try {
//             setLoading(true);
//             const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/change-username`, { username: newUsername });
//             setLoading(false);
//             console.log(result.data);
//         } catch (error) {
//             setLoading(false);
//             console.error(error);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//                 <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Change Username</h2>
//                 <form onSubmit={handleChange} className="space-y-6">
//                     <InputField label="New Username" name="newUsername" />

//                     <button
//                         type="submit"
//                         className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm"
//                     >
//                         {loading ? "Updating Username..." : "Change Username"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ChangeUsername;

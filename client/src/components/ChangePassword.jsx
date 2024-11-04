// import { useState } from "react";
// import axios from "axios";
// import InputField from "./fields/inputField";

// function ChangePassword() {
//     const [loading, setLoading] = useState(false);

//     const handleChange = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const { currentPassword, newPassword } = Object.fromEntries(formData.entries());

//         try {
//             setLoading(true);
//             const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/change-password`, {
//                 currentPassword, newPassword
//             });
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
//                 <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Change Password</h2>
//                 <form onSubmit={handleChange} className="space-y-6">
//                     <InputField label="Current Password" name="currentPassword" type="password" />
//                     <InputField label="New Password" name="newPassword" type="password" />

//                     <button
//                         type="submit"
//                         className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm"
//                     >
//                         {loading ? "Updating Password..." : "Change Password"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ChangePassword;

import { useState } from "react";
import axios from "axios";

function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(''); // State for displaying messages

    const handleChange = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            // Send currentPassword and newPassword to the backend
            const result = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/users/change-password`, // Correct URL for your backend endpoint
                { currentPassword, newPassword }, // Sending current and new password in the body
                { withCredentials: true } // This ensures the JWT token in cookies is sent along with the request
            );
            setLoading(false);
            setMessage(result.data.message || "Password changed successfully!"); // Display success message
        } catch (error) {
            setLoading(false);
            setMessage("Failed to change password. Please try again."); // Display error message
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Change Password</h2>
                <form onSubmit={handleChange} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="currentPassword" className="mb-2 text-gray-600">Current Password</label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="newPassword" className="mb-2 text-gray-600">New Password</label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm"
                    >
                        {loading ? "Updating Password..." : "Change Password"}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 text-center ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChangePassword;



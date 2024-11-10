import { useState } from "react";
import axios from "axios";

function ChangeUsername() {
    const [loading, setLoading] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState(''); // State for displaying messages

    const handleChange = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const result = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/users/change-username`,
                { username: newUsername }, // Sending the new username to the backend
                { withCredentials: true }) // Ensure cookies (e.g., JWT token) are sent with the request
            setLoading(false);
            setMessage(result.data.message || "Username changed successfully!"); // Display success message
        } catch (error) {
            setLoading(false);
            setMessage("Failed to change username. Please try again."); // Display error message
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Change Username</h2>
                <form onSubmit={handleChange} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="newUsername" className="mb-2 text-gray-600">New Username</label>
                        <input
                            type="text"
                            id="newUsername"
                            name="newUsername"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm"
                    >
                        {loading ? "Updating Username..." : "Change Username"}
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

export default ChangeUsername;


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ChangeUsername() {
    const { _id: userId } = useSelector(store => store.user);
    const [newUsername, setNewUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/change-username`, {
                userId,
                newUsername
            });
            setSuccess(response.data.message);
            setNewUsername("");
            toast.success("Username updated successfully!");
        } catch (error) {
            console.error("Error changing username:", error);
            setError("Failed to change username. Please try again.");
            toast.error("Failed to change username");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Change Username</h1>
            <form onSubmit={handleChangeUsername}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="New Username"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <button 
                    type="submit" 
                    className="bg-green-600 text-white py-2 px-4 rounded" 
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Change Username"}
                </button>
            </form>
        </div>
    );
}

export default ChangeUsername;

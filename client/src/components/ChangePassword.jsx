import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ChangePassword() {
    const { _id: userId } = useSelector(store => store.user);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/change-password`, {
                userId,
                oldPassword,
                newPassword
            });
            setSuccess(response.data.message);
            setOldPassword("");
            setNewPassword("");
            toast.success("Password updated successfully!");
        } catch (error) {
            console.error("Error changing password:", error);
            setError("Failed to change password. Please try again.");
            toast.error("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Change Password</h1>
            <form onSubmit={handleChangePassword}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="block w-full p-3 border border-gray-300 rounded mb-4"
                    required
                />
                <button 
                    type="submit" 
                    className="bg-green-600 text-white py-2 px-4 rounded" 
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;

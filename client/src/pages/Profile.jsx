import { useEffect } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
    const user = useSelector((store) => store.user);  

    if (!user) return <div>Loading...</div>;
 //  bg-[rgb(55,97,55)]
    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-green-800 mb-8">Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-lg">
                <div className="flex items-center mb-6">
                    <Avatar name={user?.name} size={100} className="rounded-full" />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-green-700">{user.name}</h2>
                        <p className="text-gray-600">{user.username}</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-bold text-green-700 mb-2">Contact Information</h3>
                    <p className="text-gray-600">Phone: {user?.mobile}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-bold text-green-700 mb-2">About Me</h3>
                    <p className="text-gray-600">Location: {user?.city}</p>
                </div>

                <div className="flex justify-end mt-6">
                    <Link to="/settings/change-username" className="py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;

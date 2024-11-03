import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

function Profile() {
    const user = useSelector((store) => store.user);

    if (!user) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-500 text-lg">Loading profile...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-white mt-6 mb-10">Profile</h1>
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <Avatar
                        name={user?.name}
                        size={120}
                        round={true}
                        className="shadow-lg"
                        color="#379737"
                        fgColor="#fff"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">{user.name}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6 w-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Information</h3>
                    <p className="text-gray-600 mb-2"><strong>Phone:</strong> {user.mobile}</p>
                    <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email || "Not Provided"}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6 w-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">About Me</h3>
                    <p className="text-gray-600 mb-2"><strong>Location:</strong> {user.city || "Not Specified"}</p>
                    <p className="text-gray-600"><strong>Joined:</strong> {user.joinedDate || "N/A"}</p>
                </div>

                <div className="flex justify-center mt-8">
                    <Link
                        to="/settings/change-username"
                        className="py-2 px-6 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-200"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;

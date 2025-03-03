import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfile(user);
      setUpdatedName(user.name);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = () => {
    const updatedProfile = { ...profile, name: updatedName };
    setProfile(updatedProfile);
    localStorage.setItem("currentUser", JSON.stringify(updatedProfile));
    setEditing(false);
  };

  if (!profile) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h2>

        <div className="space-y-6">

          {/* Profile Picture Placeholder */}
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-orange-200 flex items-center justify-center text-2xl font-bold text-white">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Username */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Username:</h3>
            <p className="text-gray-600">{profile.username}</p>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
            <p className="text-gray-600">{profile.email}</p>
          </div>

          {/* Editable Name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Name:</h3>
            {editing ? (
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              />
            ) : (
              <p className="text-gray-600">{profile.name}</p>
            )}
          </div>

          {/* Edit / Save Buttons */}
          <div className="flex justify-between gap-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="w-full bg-green-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="w-full bg-gray-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-300"
              >
                Edit Name
              </button>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-slate-700 text-white font-semibold py-2 rounded-md shadow-md hover:bg-slate-800 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

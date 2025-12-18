import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/outline";
const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error || "Profile not found"}</p>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-300 transition"
          onClick={() => navigate("/auth/user/create-profile")}
        >
          <span className="flex">
            <UserPlusIcon width="25" height="25px" />
            Create Profile
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-4xl w-full mx-auto mt-12 bg-white rounded-2xl shadow-lg overflow-hidden font-sans">
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-gray-50">
          <img
            src={profile.image}
            alt={profile.fullname}
            className="w-32 h-32 rounded-full object-cover border-1 border-gray-100 shadow-lg"
          />
          <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {profile.fullname}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {profile.loginId.email || "user@example.com"}
            </p>
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-300 transition"
              onClick={() => navigate("/auth/user/edit-profile")}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <div className="bg-orange-50 p-4 rounded-lg shadow-inner">
            <p className="text-xs font-semibold text-orange-700 uppercase mb-1">
              Age
            </p>
            <p className="text-lg font-medium text-gray-800">
              {profile.age || "-"}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg shadow-inner">
            <p className="text-xs font-semibold text-orange-700 uppercase mb-1">
              Gender
            </p>
            <p className="text-lg font-medium text-gray-800 capitalize">
              {profile.gender || "-"}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg shadow-inner">
            <p className="text-xs font-semibold text-orange-700 uppercase mb-1">
              Height
            </p>
            <p className="text-lg font-medium text-gray-800">
              {profile.height || "-"}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg shadow-inner">
            <p className="text-xs font-semibold text-orange-700 uppercase mb-1">
              Weight
            </p>
            <p className="text-lg font-medium text-gray-800">
              {profile.weight || "-"}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 bg-orange-50 p-4 rounded-lg shadow-inner">
            <p className="text-xs font-semibold text-orange-700 uppercase mb-1">
              Fitness Goals
            </p>
            <p className="text-lg font-medium text-gray-800">
              {profile.fitness_goals || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

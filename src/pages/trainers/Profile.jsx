import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/trainerServices";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/outline";
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.trainer);
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
      <div className="flex justify-center items-center">
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-6xl p-8 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-center md:w-1/3">
          {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h3> */}
          <img
            src={profile.image}
            alt={profile.fullname}
            className="w-40 h-40 rounded-full object-cover shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {profile.fullname}
          </h2>
          <p className="text-gray-500">{profile.specialization}</p>
          <div className="mt-6 flex gap-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/auth/trainer/edit-profile")}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="md:w-2/3 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Full Name</span>
              <span className="text-gray-800 font-medium">
                {profile.fullname}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="text-gray-800 font-medium">
                {profile.loginId?.email || "N / A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Phone</span>
              <span className="text-gray-800 font-medium">
                {profile.phone_number}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Specialization</span>
              <span className="text-gray-800 font-medium">
                {profile.specialization}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Experience</span>
              <span className="text-gray-800 font-medium">
                {profile.experience}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">
                Earnings per Session
              </span>
              <span className="text-gray-800 font-medium">
                ${profile.earnings_per_session}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">
                Verification Document
              </span>
              <a
                href={profile.verification_docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Document
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="text-gray-800 font-medium">
                {profile.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

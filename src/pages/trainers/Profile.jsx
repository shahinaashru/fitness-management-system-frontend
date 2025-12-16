import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/trainerServices";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (error || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error || "Profile not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-6xl p-8 flex flex-col md:flex-row gap-8">
        {/* Profile Photo */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={profile.image}
            alt={profile.fullname}
            className="w-40 h-40 rounded-full object-cover shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {profile.fullname}
          </h2>
          <p className="text-gray-500">{profile.specialization}</p>
        </div>

        {/* Personal Information */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
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
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Created At</span>
              <span className="text-gray-800 font-medium">
                {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Updated At</span>
              <span className="text-gray-800 font-medium">
                {new Date(profile.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

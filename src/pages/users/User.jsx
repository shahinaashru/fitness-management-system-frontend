import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userServices";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function User() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        getUsers()
          .then((res) => {
            setUserData(res.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Users List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-200">
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Email
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Gender
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Fitness Goals
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Height
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Weight
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Created At
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Updated At
              </th>
              <th className="py-3 px-6 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(userData) &&
              userData.map((user) => (
                <tr className="border-b border-gray-100 hover:bg-indigo-50 transition">
                  <td className="py-4 px-6">{user.fullname}</td>
                  <td className="py-4 px-6">{user.loginId.email}</td>
                  <td className="py-4 px-6">{user.gender}</td>
                  <td className="py-4 px-6">{user.fitness_goals}</td>
                  <td className="py-4 px-6">{user.height}</td>
                  <td className="py-4 px-6">{user.weight}</td>
                  <td className="py-4 px-6">{user.createdAt}</td>
                  <td className="py-4 px-6">{user.updatedAt}</td>
                  <td className="py-4 px-6 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => navigate(`/users/${user._id}`)}
                      className="flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/users/${user._id}/edit`)}
                      className="flex items-center px-3 py-1 text-sm font-medium text-white bg-orange-500 rounded hover:bg-blue-600 transition"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

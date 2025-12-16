import React, { useEffect, useState } from "react";
import { getFitnessData } from "../../services/userServices";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function FitnessProgram() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fitnessData, setFitnessData] = useState([]);
  useEffect(() => {
    const fetchFitnessData = async () => {
      try {
        getFitnessData()
          .then((res) => {
            setFitnessData(res.data.fitness_programs);
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

    fetchFitnessData();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Fitness Program List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Goal Type
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Duration
              </th>
              <th className="py-3 px-6 text-right font-semibold text-gray-600">
                Number Of Sessions
              </th>
              <th className="py-3 px-6 text-right font-semibold text-gray-600">
                Cost
              </th>
              <th className="py-3 px-6 text-right font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(fitnessData) &&
              fitnessData.map((fitness) => (
                <tr className="border-b border-gray-100 hover:bg-indigo-50 transition">
                  <td className="py-4 px-6">{fitness.program_name}</td>
                  <td className="py-4 px-6">{fitness.goal_type}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {fitness.duration}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {fitness.number_of_sessions}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {fitness.cost}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => navigate(`/fitnesss/${fitness._id}`)}
                      className="flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View full Details
                    </button>

                    <button
                      onClick={() => navigate(`/fitnesss/${fitness._id}/edit`)}
                      className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(fitness._id)}
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

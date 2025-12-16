import React, { useEffect, useState } from "react";
import { getTrainers } from "../../services/userServices";
const statusColors = {
  pending: "text-yellow-700 bg-yellow-100",
  approved: "text-green-700 bg-green-100",
  rejected: "text-red-700 bg-red-100",
  suspended: "text-gray-700 bg-gray-200",
};
export default function Trainers() {
  const [trainerData, setTrainerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        getTrainers()
          .then((res) => {
            setTrainerData(res.data.trainer);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.error("Error trainer data:", err);
        setError("Failed to load trainer data");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerData();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Trainers List
      </h2>

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
                Contact Number
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Experiance
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Specialization
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Earnings per session
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Created At
              </th>
              <th className="py-3 px-6 text-left font-semibold text-gray-600">
                Updated At
              </th>
              <th className="py-3 px-6 text-right font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(trainerData) &&
              trainerData.map((trainer) => (
                <tr className="border-b border-gray-100 hover:bg-indigo-50 transition">
                  <td className="py-4 px-6">{trainer.fullname}</td>
                  <td className="py-4 px-6">{trainer.loginId.email}</td>
                  <td className="py-4 px-6">{trainer.phone_number}</td>
                  <td className="py-4 px-6">{trainer.experience}</td>
                  <td className="py-4 px-6">{trainer.specialization}</td>
                  <td className="py-4 px-6">{trainer.earnings_per_session}</td>
                  <td className="py-4 px-6">{trainer.createdAt}</td>
                  <td className="py-4 px-6">{trainer.updatedAt}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full ${
                        statusColors[trainer.status.toLowerCase()] ||
                        "text-gray-700 bg-gray-100"
                      }`}
                    >
                      {trainer.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getTrainers } from "../../services/trainerServices";
export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        getTrainers()
          .then((res) => {
            setTrainers(res.data.trainer);
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
    fetchTrainers();
  }, []);
  return (
    <div>
      <div className="bg-white rounded shadow-md p-6 w-full max-w-8xl mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 font-semibold text-lg">
            Personal Trainer Available
          </h2>
          <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            + Book Session
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="border-b bg-gray-200 border-gray-100 text-gray-500">
              <tr>
                <th className="p-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Earnings per session</th>
                <th className="py-2">Experiance</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 flex items-center space-x-3">
                    <img
                      src={trainer.image}
                      alt={trainer.fullname}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-800 font-medium">
                      {trainer.fullname}
                    </span>
                  </td>

                  <td className="py-3">{trainer.loginId.email}</td>
                  <td className="py-3 text-blue-500 font-medium">
                    {trainer.earnings_per_session}
                  </td>
                  <td className="py-3 text-blue-500 font-medium">
                    {trainer.experience}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

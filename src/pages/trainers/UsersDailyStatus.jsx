import React, { useEffect, useState } from "react";
import { getActivities } from "../../services/trainerServices";
import { toast } from "react-toastify";
const UsersDailyStatus = () => {
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const [selectedDate, setSelectedDate] = useState(() => getToday());
  const [filteredData, setFilteredData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchActivityData = async () => {
    try {
      const res = await getActivities(selectedDate);
      setActivityData(res.data.dailyActivity);
      toast.success(res.data.message || "Daily status retrieved successfully", {
        position: "top-center",
      });
    } catch (err) {
      // toast.error(
      //   err.response.data.error ||
      //     err.response.data.message ||
      //     "Something went wrong!",
      //   { position: "top-center" }
      // );
      console.log(err);
      setActivityData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedDate) {
      const filtered = activityData.filter(
        (entry) => entry.date === selectedDate
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(activityData);
    }
    fetchActivityData();
  }, [selectedDate]);

  return (
    <div className="bg-gray-50 h-screen">
      <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-full-screen">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Users Activity Status
        </h1>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Date</th>
                <th className="py-3 px-6 text-left font-semibold">User</th>
                <th className="py-3 px-6 text-left font-semibold">
                  Workout Status
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Nutrition Status
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Suggestion
                </th>
              </tr>
            </thead>
            <tbody>
              {activityData.length > 0 ? (
                activityData.map((entry, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6">
                      {new Date(entry.date).toDateString()}
                    </td>
                    <td className="py-4 px-6">{entry.user.fullname}</td>
                    <td className="py-4 px-6 capitalize">
                      {entry.workoutStatus}
                    </td>
                    <td className="py-4 px-6 capitalize">
                      {entry.dietPlanStatus}
                    </td>
                    <td className="py-4 px-6">{entry.suggestion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 px-6 text-gray-500"
                  >
                    No data for selected date
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersDailyStatus;

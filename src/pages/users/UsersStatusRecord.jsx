import React, { useState, useEffect } from "react";

// Sample data
const dailyStatusData = [
  {
    date: "2025-11-20",
    user: "Alice",
    workoutStatus: "completed",
    nutritionStatus: "pending",
    suggestion: "Focus on core exercises",
  },
  {
    date: "2025-11-20",
    user: "Bob",
    workoutStatus: "pending",
    nutritionStatus: "completed",
    suggestion: "Increase protein intake",
  },
  {
    date: "2025-11-21",
    user: "Alice",
    workoutStatus: "skipped",
    nutritionStatus: "completed",
    suggestion: "Catch up on missed workout",
  },
];

const DailyStatusRecord = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = dailyStatusData.filter(
        (entry) => entry.date === selectedDate
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dailyStatusData);
    }
  }, [selectedDate]);

  return (
    <div className="bg-gray-50 h-screen">
      <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-full-screen">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Users Daily Status
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

        {/* Status Table */}
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
              {filteredData.length > 0 ? (
                filteredData.map((entry, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6">
                      {new Date(entry.date).toDateString()}
                    </td>
                    <td className="py-4 px-6">{entry.user}</td>
                    <td className="py-4 px-6 capitalize">
                      {entry.workoutStatus}
                    </td>
                    <td className="py-4 px-6 capitalize">
                      {entry.nutritionStatus}
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

export default DailyStatusRecord;

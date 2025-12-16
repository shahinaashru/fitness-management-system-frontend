import React, { useState } from "react";
const initialData = {
  workoutStatus: "pending",
  nutritionStatus: "pending",
  suggestion: "Focus on hydration today!",
};
const DailyStatusCard = () => {
  const [workoutStatus, setWorkoutStatus] = useState(initialData.workoutStatus);
  const [nutritionStatus, setNutritionStatus] = useState(
    initialData.nutritionStatus
  );
  const [suggestion, setSuggestion] = useState(initialData.suggestion);

  const handleUpdate = () => {
    // Replace this with your API call to save data
    alert(`Updated for ${initialData.date}:
Workout Status: ${workoutStatus}
Nutrition Status: ${nutritionStatus}
Suggestion: ${suggestion}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-lg mx-auto w-full bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          Date: {new Date(initialData.date).toDateString()}
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="workoutStatus">
            Workout Status
          </label>
          <select
            id="workoutStatus"
            value={workoutStatus}
            onChange={(e) => setWorkoutStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="skipped">Skipped</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="nutritionStatus">
            Nutrition Status
          </label>
          <select
            id="nutritionStatus"
            value={nutritionStatus}
            onChange={(e) => setNutritionStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="skipped">Skipped</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1" htmlFor="suggestion">
            Suggestion
          </label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            placeholder="Enter any suggestion here..."
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default DailyStatusCard;

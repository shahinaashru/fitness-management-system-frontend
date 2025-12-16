import React, { useEffect, useState } from "react";
import { getWeeklyPlan, addDailyActivity } from "../../services/userServices";
import { toast } from "react-toastify";
const DailyActivity = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${yyyy}-${mm}-${dd}`;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const defaultDay = daysOfWeek[today.getDay()];
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [dayPlan, setDayPlan] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [workoutStatus, setWorkoutStatus] = useState("pending");
  const [dietStatus, setDietStatus] = useState("pending");
  const [programId, setProgramId] = useState("");
  const getDayFromDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", { weekday: "long" });
  };
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getWeeklyPlan();
        const data = res.data.data.weeklyPlan;
        setWeeklyPlan(data);
        setProgramId(res.data.data.programId);
      } catch (err) {
        console.log("Error fetching plan", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);
  useEffect(() => {
    const updatedDay = getDayFromDate(selectedDate);
    setSelectedDay(updatedDay);
    const plan = weeklyPlan.find((d) => d.day === updatedDay);
    setDayPlan(plan || null);
  }, [selectedDate, weeklyPlan]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dietStatus || !workoutStatus || !selectedDate) {
      toast.error("All fileds are required!", {
        position: "top-center",
      });
      return;
    }
    const payload = {
      date: selectedDate,
      dietPlanStatus: dietStatus,
      workoutStatus: workoutStatus,
      programId: programId,
    };
    addDailyActivity(payload)
      .then((res) => {
        const data = res.data;
        toast.success(data.message || "Daily activity added successful!", {
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error(
          err.response.data.error ||
            err.response.data.message ||
            "Something went wrong!",
          { position: "top-center" }
        );
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="border border-gray-100 rounded-md p-8 m-8 bg-white shadow max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label className="font-semibold mb-2 sm:mb-0">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <h2 className="font-bold text-xl mb-6">
        {selectedDay}, {selectedDate}
      </h2>

      {!dayPlan && (
        <p className="text-red-500 font-semibold">
          No plan available for this day.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {dayPlan && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Workout Plan
              </h3>
              <table className="w-full border-collapse border-gray-400 mb-3">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-3 text-left font-semibold">
                      Exercise
                    </th>
                    <th className="py-2 px-3 text-center font-semibold">
                      Sets
                    </th>
                    <th className="py-2 px-3 text-center font-semibold">
                      Reps
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dayPlan.workouts.map((ex) => (
                    <tr key={ex._id} className="border-t border-gray-400">
                      <td className="py-2 px-3">{ex.name}</td>
                      <td className="py-2 px-3 text-center">{ex.sets}</td>
                      <td className="py-2 px-3 text-center">{ex.reps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-3">
                <label className="font-semibold mr-2">Workout Status:</label>
                <select
                  value={workoutStatus}
                  onChange={(e) => setWorkoutStatus(e.target.value)}
                  className="border border-orange-400 px-3 py-2 rounded-md bg-orange-500 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="skipped">Skipped</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-lg">Diet Plan</h3>

              {dayPlan.dietPlan.map((meal) => (
                <div
                  key={meal._id}
                  className="mb-4 border border-gray-400 p-4 rounded-md bg-gray-50"
                >
                  <h4 className="font-semibold mb-1">
                    {meal.mealType} ({meal.time})
                  </h4>

                  <table className="w-full border-collapse mb-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-2 px-3 text-left font-semibold">
                          Food
                        </th>
                        <th className="py-2 px-3 text-center font-semibold">
                          Calories
                        </th>
                        <th className="py-2 px-3 text-center font-semibold">
                          Protein
                        </th>
                        <th className="py-2 px-3 text-center font-semibold">
                          Carbs
                        </th>
                        <th className="py-2 px-3 text-center font-semibold">
                          Fats
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {meal.items.map((item, i) => (
                        <tr key={i} className="border-t border-gray-400">
                          <td className="py-2 px-3">{item.food}</td>
                          <td className="py-2 px-3 text-center">
                            {item.calories}
                          </td>
                          <td className="py-2 px-3 text-center">
                            {item.protein}
                          </td>
                          <td className="py-2 px-3 text-center">
                            {item.carbs}
                          </td>
                          <td className="py-2 px-3 text-center">{item.fats}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <div className="flex justify-end mt-3">
                <label className="font-semibold mr-2">Diet Status:</label>
                <select
                  value={dietStatus}
                  onChange={(e) => setDietStatus(e.target.value)}
                  className="border px-3 py-2 rounded-md bg-orange-500 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="skipped">Skipped</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Notes / Suggestions</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-400 rounded-md px-3 py-2"
            rows={4}
            placeholder="Enter feedback..."
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white px-6 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyActivity;

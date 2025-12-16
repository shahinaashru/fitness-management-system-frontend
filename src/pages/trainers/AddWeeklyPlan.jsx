import React, { useState, useEffect } from "react";
import { getUsersByOrder } from "../../services/userServices";
import { addWeeklyPlan } from "../../services/trainerServices";
import { toast } from "react-toastify";
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
const emptyWorkoutItem = { name: "", sets: "", reps: "" };
const emptyDietItem = {
  food: "",
  calories: "",
  protein: "",
  carbs: "",
  fats: "",
};

const AddWeeklyPlan = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        getUsersByOrder()
          .then((res) => {
            setUserData(res.data.users);
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
  const [selectedUser, setSelectedUser] = useState("");
  const [startDate, setStartDate] = useState("");

  const [weeklyPlan, setWeeklyPlan] = useState(() =>
    daysOfWeek.map((day) => ({
      day,
      workouts: [{ ...emptyWorkoutItem }],
      diet: mealTypes.reduce((acc, meal) => {
        acc[meal] = { time: "", items: [{ ...emptyDietItem }] };
        return acc;
      }, {}),
    }))
  );
  const handleWorkoutChange = (dayIndex, itemIndex, field, value) => {
    const copy = [...weeklyPlan];
    copy[dayIndex].workouts[itemIndex][field] = value;
    setWeeklyPlan(copy);
  };
  const addWorkoutItem = (dayIndex) => {
    const copy = [...weeklyPlan];
    copy[dayIndex].workouts.push({ ...emptyWorkoutItem });
    setWeeklyPlan(copy);
  };
  const handleMealTimeChange = (dayIndex, meal, value) => {
    const copy = [...weeklyPlan];
    copy[dayIndex].diet[meal].time = value;
    setWeeklyPlan(copy);
  };

  const handleDietItemChange = (dayIndex, meal, itemIndex, field, value) => {
    const copy = [...weeklyPlan];
    copy[dayIndex].diet[meal].items[itemIndex][field] = value;
    setWeeklyPlan(copy);
  };

  const addDietItem = (dayIndex, meal) => {
    const copy = [...weeklyPlan];
    copy[dayIndex].diet[meal].items.push({ ...emptyDietItem });
    setWeeklyPlan(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
      user: selectedUser,
      startDate,
      weeklyPlan,
    };
    addWeeklyPlan(payload)
      .then((res) => {
        toast.success(res.data.message || "Weekly plan added successfully!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Error adding weekly plan:", error);
        toast.success(res.data.error || "Something went wrong!", {
          position: "top-center",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-full-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Add Weekly Plan
      </h1>
      <form onSubmit={handleSubmit}>
        {/* User and Date */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Select User --</option>
            {userData.map((u) => (
              <option key={u._id} value={u._id}>
                {u.fullname}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">Week Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            // required
          />
        </div>
        {weeklyPlan.map((dayPlan, dayIndex) => (
          <div
            key={dayPlan.day}
            className="mb-10 border border-gray-300 rounded p-4 bg-gray-50"
          >
            <h2 className="font-bold mb-3">{dayPlan.day}</h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Workouts</h3>
              {dayPlan.workouts.map((w, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-3 items-center mb-2"
                >
                  <input
                    type="text"
                    placeholder="Exercise Name"
                    value={w.name}
                    onChange={(e) =>
                      handleWorkoutChange(dayIndex, i, "name", e.target.value)
                    }
                    className="border border-gray-400 rounded px-2 py-1 col-span-2"
                    // required
                  />
                  <input
                    type="number"
                    placeholder="Sets"
                    value={w.sets}
                    onChange={(e) =>
                      handleWorkoutChange(dayIndex, i, "sets", e.target.value)
                    }
                    className="border border-gray-400 rounded px-2 py-1"
                    min={1}
                    // required
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={w.reps}
                    onChange={(e) =>
                      handleWorkoutChange(dayIndex, i, "reps", e.target.value)
                    }
                    className="border border-gray-400 rounded px-2 py-1"
                    min={1}
                    // required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addWorkoutItem(dayIndex)}
                className="text-blue-600 hover:underline mt-1"
              >
                + Add Workout
              </button>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Diet / Nutrition</h3>
              {mealTypes.map((meal) => {
                const mealData = dayPlan.diet[meal];
                return (
                  <div
                    key={meal}
                    className="mb-6 border border-gray-400 p-3 rounded bg-gray-100"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-lg text-gray-800">
                        {meal}
                      </h4>
                      <input
                        type="time"
                        value={mealData.time}
                        onChange={(e) =>
                          handleMealTimeChange(dayIndex, meal, e.target.value)
                        }
                        className="border border-gray-400 rounded px-2 py-1 w-24"
                        // required
                      />
                    </div>

                    {mealData.items.map((item, iIndex) => (
                      <div
                        key={iIndex}
                        className="grid grid-cols-6 gap-3 items-center mb-2"
                      >
                        <input
                          type="text"
                          placeholder="Food Item"
                          value={item.food}
                          onChange={(e) =>
                            handleDietItemChange(
                              dayIndex,
                              meal,
                              iIndex,
                              "food",
                              e.target.value
                            )
                          }
                          className="border border-gray-400 rounded px-2 py-1 col-span-2"
                          // required
                        />
                        <input
                          type="number"
                          placeholder="Calories"
                          value={item.calories}
                          onChange={(e) =>
                            handleDietItemChange(
                              dayIndex,
                              meal,
                              iIndex,
                              "calories",
                              e.target.value
                            )
                          }
                          className="border border-gray-400 rounded px-2 py-1"
                          min={0}
                          // required
                        />
                        <input
                          type="number"
                          placeholder="Protein"
                          value={item.protein}
                          onChange={(e) =>
                            handleDietItemChange(
                              dayIndex,
                              meal,
                              iIndex,
                              "protein",
                              e.target.value
                            )
                          }
                          className="border border-gray-400 rounded px-2 py-1"
                          min={0}
                          // required
                        />
                        <input
                          type="number"
                          placeholder="Carbs"
                          value={item.carbs}
                          onChange={(e) =>
                            handleDietItemChange(
                              dayIndex,
                              meal,
                              iIndex,
                              "carbs",
                              e.target.value
                            )
                          }
                          className="border border-gray-400 rounded px-2 py-1"
                          min={0}
                          // required
                        />
                        <input
                          type="number"
                          placeholder="Fats"
                          value={item.fats}
                          onChange={(e) =>
                            handleDietItemChange(
                              dayIndex,
                              meal,
                              iIndex,
                              "fats",
                              e.target.value
                            )
                          }
                          className="border border-gray-400 rounded px-2 py-1"
                          min={0}
                          // required
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addDietItem(dayIndex, meal)}
                      className="text-green-600 hover:underline mt-1"
                    >
                      + Add {meal} Item
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-semibold py-3 rounded hover:bg-blue-800"
        >
          Save Weekly Plan
        </button>
      </form>
    </div>
  );
};

export default AddWeeklyPlan;

import React, { useEffect, useState } from "react";
import { getTodaysActivity } from "../../services/userServices";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
export default function DashbordTodaysActivity() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [dietPlan, setDietPlan] = useState([]);
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        getTodaysActivity()
          .then((res) => {
            const workouts = res.data.todayWorkoutPlan.workouts;
            setWorkouts(workouts);
            setDietPlan(res.data.todayWorkoutPlan.dietPlan);
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

    fetchActivity();
  }, []);
  return (
    <div>
      <div className="w-full bg-white rounded-2xl shadow-md p-4 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-orange-800 font-semibold text-lg">Scheduled</h2>
          <span className="text-sm text-orange-500 flex items-center">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <ul className="bg-orange-400 p-2">
          <li className="flex items-center last:border-none">
            <span className="w-1/2 text-gray-700 text-sm text-left">Name</span>
            <span className="w-1/4 text-gray-700 text-sm text-left">Sets</span>
            <span className="w-1/4 text-gray-700 text-sm text-left">Reps</span>
          </li>
        </ul>
        <ul className="space-y-2 px-2">
          {workouts?.map((item, index) => (
            <li
              key={index}
              className="flex items-center border-b border-gray-100 pb-2 last:border-none"
            >
              <span className="w-1/2 text-gray-700 text-sm text-left">
                {item.name}
              </span>
              <span className="w-1/4 text-gray-500 text-sm text-left">
                {item.sets}
              </span>
              <span className="w-1/4 text-gray-500 text-sm text-left">
                {item.reps}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-4 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-orange-800 font-semibold text-lg">
            Todays diet plan
          </h2>
          <span className="text-sm text-orange-500 flex items-center">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="space-y-3">
          {dietPlan?.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center border border-orange-500 rounded-xl p-3 hover:shadow-sm transition`}
            >
              <div className="flex items-start space-x-2">
                <div className="mt-1">
                  <WrenchScrewdriverIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-gray-800 text-sm font-medium">
                    {item.mealType}
                  </h3>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
              {item.items?.map((it, index) => (
                <span className="text-gray-600 text-sm font-medium">
                  {it.food}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

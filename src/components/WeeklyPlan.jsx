import React from "react";

const WeeklyPlan = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-8 p-6">
      {data.map((dayPlan) => (
        <div
          key={dayPlan._id}
          className="border border-gray-300 rounded-lg p-6 bg-white shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">{dayPlan.day}</h2>

          {/* Workouts */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Workout Plan
          </h3>
          {(!dayPlan.workouts || dayPlan.workouts.length === 0) && (
            <p className="text-gray-500">No workouts for this day.</p>
          )}
          {dayPlan.workouts?.map((workout) => (
            <div key={workout._id} className="mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="w-1/3 py-2 px-4 text-left">Exercise</th>
                    <th className="w-1/3 py-2 px-4 text-left">Sets</th>
                    <th className="w-1/3 py-2 px-4 text-left">Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 px-4 text-left">{workout.name}</td>
                    <td className="py-2 px-4 text-left">{workout.sets}</td>
                    <td className="py-2 px-4 text-left">{workout.reps}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {/* Diet Plan */}
          <h3 className="text-lg font-semibold mb-2">Diet Plan</h3>
          {(!dayPlan.dietPlan || dayPlan.dietPlan.length === 0) && (
            <p className="text-gray-500">No meals for this day.</p>
          )}
          {dayPlan.dietPlan?.map((meal) => (
            <div key={meal._id} className="mb-6">
              <h4 className="font-semibold text-md mb-2">{meal.mealType}</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="w-2/5 py-2 px-4 text-left">Food</th>
                    <th className="w-1/5 py-2 px-4 text-left">Calories</th>
                    <th className="w-1/5 py-2 px-4 text-left">Protein</th>
                    <th className="w-1/5 py-2 px-4 text-left">Carbs</th>
                    <th className="w-1/5 py-2 px-4 text-left">Fats</th>
                  </tr>
                </thead>
                <tbody>
                  {meal.items?.map((item) => (
                    <tr key={item._id} className="border-b border-gray-400">
                      <td className="py-2 px-4 text-left">{item.food}</td>
                      <td className="py-2 px-4 text-left">{item.calories}</td>
                      <td className="py-2 px-4 text-left">{item.protein}</td>
                      <td className="py-2 px-4 text-left">{item.carbs}</td>
                      <td className="py-2 px-4 text-left">{item.fats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default WeeklyPlan;

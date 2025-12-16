import React from "react";
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const FitnessCard = ({ item }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 max-w-sm mx-auto">
      <div className="relative">
        <img
          src={
            item.image || "/mnt/data/81552841-5fcc-419e-8d35-c9d537c0eecd.png"
          }
          alt={item.program_name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          {item.goal_type}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{item.program_name}</h3>
        {item.trainer && (
          <p className="text-gray-700 text-sm">
            Trainer:{" "}
            <span className="font-medium text-gray-900">
              {item.trainer.fullname}
            </span>
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm mt-2">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            {item.duration} weeks
          </div>
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5" />
            {item.number_of_sessions} sessions
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <CurrencyDollarIcon className="w-5 h-5" />$
            {item.cost.toLocaleString()}
          </div>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Workout: {item.workout_plan}
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
            Nutrition: {item.nutrition_plan}
          </span>
        </div>
        <div className="flex items-center mt-3 space-x-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessCard;

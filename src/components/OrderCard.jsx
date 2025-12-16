import React from "react";
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const OrderCard = ({ order }) => {
  const { program, paymentStatus, createdAt, _id } = order;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 max-w-md mx-auto mb-4">
      <div className="p-5 space-y-3">
        {/* Program Info */}
        <h3 className="text-xl font-bold text-gray-900">
          {program.program_name}
        </h3>
        {/* {program.trainer && (
          <p className="text-gray-700 text-sm">
            Trainer:{" "}
            <span className="font-medium">{program.trainer.fullname}</span>
          </p>
        )} */}
        <p className="text-gray-700 text-sm">
          Goal: <span className="font-medium">{program.goal_type}</span>
        </p>

        {/* Program Stats */}
        <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm mt-2">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            Duration: {program.duration} weeks
          </div>
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5" />
            Sessions: {program.number_of_sessions}
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <CurrencyDollarIcon className="w-5 h-5" />
            Cost: ${program?.cost ? program.cost.toLocaleString() : "N/A"}
          </div>
        </div>

        {/* Payment Status & Order Info */}
        <div className="mt-3 text-sm text-gray-700">
          <p>
            Payment Status:{" "}
            <span
              className={`font-medium ${
                paymentStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {paymentStatus}
            </span>
          </p>
          <p>
            Order ID: <span className="font-medium">{_id}</span>
          </p>
          <p>
            Purchased on:{" "}
            <span className="font-medium">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Plans */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Workout: {program.workout_plan}
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
            Nutrition: {program.nutrition_plan}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

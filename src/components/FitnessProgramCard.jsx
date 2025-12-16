import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { makePaymentOnStripe } from "../services/userServices";
const FitnessCard = ({ item }) => {
  const userRole = useSelector((state) => state.user.user.role);
  const makePayment = async () => {
    try {
      const body = { fitnessProgram: item };
      const response = await makePaymentOnStripe(body);
      const url = response.data.url;
      if (url) {
        window.location.href = url;
      } else {
        console.error("Stripe session URL not found");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      if (err.response) {
        toast.error(
          err.response.data.error ||
            err.response.data.message ||
            "Something went wrong!",
          { position: "top-center" }
        );
      } else {
        toast.error("Network error. Please try again.", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 max-w-sm flex flex-col">
      <div className="relative">
        <img
          src={
            item.image || "/mnt/data/81552841-5fcc-419e-8d35-c9d537c0eecd.png"
          }
          alt={item.program_name}
          className="h-56 w-full object-cover rounded-t-2xl"
        />
        <span
          className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg select-none ${
            userRole === "user" ? "bg-orange-500" : "bg-indigo-600"
          }`}
        >
          {item.program_name}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-lg">
          {item.program_name}
        </h3>
        <h4 className="font-semibold text-gray-700">
          Fitness goal —{" "}
          <span className="text-indigo-600">{item.goal_type}</span>
        </h4>
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">Workout Plan</span> —{" "}
          {item.workout_plan}
        </p>
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">Nutrition Plan</span> —{" "}
          {item.nutrition_plan}
        </p>

        <div className="text-sm text-gray-500 space-y-1 mt-2">
          <p className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-gray-400" />
            Duration: {item.duration} weeks
          </p>
          <p className="flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            Number of sessions: {item.number_of_sessions}
          </p>
          <p className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-gray-400" />
            Session Duration: {item.session_duration}
          </p>
          <p className="flex items-center gap-2">
            <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
            Cost:{" "}
            <span className="text-emerald-600 font-semibold">
              ${item.cost.toLocaleString()}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1 text-yellow-400 mt-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5" />
          ))}
        </div>

        {userRole === "user" && (
          <button
            className="mt-auto w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-300 transition duration-300 font-semibold"
            onClick={makePayment}
          >
            Purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default FitnessCard;

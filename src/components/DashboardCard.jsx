import React, { useState, useEffect } from "react";
import { getFitnessPrograms } from "../services/fitnessService";
import {
  StarIcon,
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function DashboardCard() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getFitnessPrograms()
      .then((res) => {
        const programs = res.data.fitness_programs;
        const sorted = programs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setClasses(sorted.slice(0, 2));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Fitness Programs
        </h2>
        <Link
          to="../fitness-programs"
          className="text-sm font-medium text-orange-500 hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {classes.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="h-44 w-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {item.tag || "New"}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>

              <div className="text-sm text-gray-500 space-y-1">
                <p className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-gray-400" /> Duration :
                  {item.duration || "10:00 AM"}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                  Number of sessions: {item.number_of_sessions}
                </p>
                <p className="flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                  Cost:{" "}
                  <span className="text-emerald-600 font-semibold">
                    ${item.cost.toLocaleString()}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

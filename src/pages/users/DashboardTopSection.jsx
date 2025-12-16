import React, { useEffect, useState } from "react";
import { getUserDashboardTopData } from "../../services/userServices";
import {
  UsersIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"; // Outline icons

export default function DashboardTopSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchTopData = async () => {
      try {
        const res = await getUserDashboardTopData();
        setUserStats(res.data.userStats);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchTopData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  const iconMap = {
    "Active Programs": UsersIcon,
    "Today's Tasks": CalendarIcon,
    "Completed Tasks": CheckCircleIcon,
    "Overall Progress": ChartBarIcon,
  };

  return (
    <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {userStats?.map((item, index) => {
        const IconComponent = iconMap[item.title] || UsersIcon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-400 shadow-sm p-6 hover:shadow-md transition"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {item.value}
                  </h3>
                </div>
                <div
                  className={`w-11 h-11 rounded-lg ${item.color} flex items-center justify-center text-white`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mt-2">{item.subtitle}</p>
              </div>
            </div>
            {item.title === "Overall Progress" && (
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { getDashbordCounts } from "../services/trainerServices";
export default function DashbordTopCountDiv() {
  const [totalSessions, setTotalSessions] = useState([]);
  const [todaysSessions, setTodaysSessions] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await getDashbordCounts();
        if (res.data) {
          setTodaysSessions(res.data.todaysSessions);
          setTotalUsers(res.data.totalUsers);
          setTotalOrders(res.data.totalOrders);
          setTotalSessions(res.data.totalSessions);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchCount();
  }, []);
  return (
    <div>
      <div className="h-30 border border-gray-100 rounded-[15px] shadow-md p-10 flex justify-evenly items-center">
        <div className="flex items-center gap-5">
          <UserIcon className="h-10 w-10 text-white bg-cyan-400 p-2 rounded" />
          <div>
            <p className="text-gray-500 text-sm">Total Members</p>
            <p className="text-xl font-bold text-gray-800">{totalUsers}</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex items-center gap-5">
          <UserIcon className="h-10 w-10 text-white bg-orange-400 p-2 rounded" />
          <div>
            <p className="text-gray-500 text-sm">Program Enrollments</p>
            <p className="text-xl font-bold text-gray-800">{totalOrders}</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="flex items-center gap-5">
          <UserIcon className="h-10 w-10 text-white bg-purple-400 p-2 rounded" />
          <div>
            <p className="text-gray-500 text-sm">Personal Schedules</p>
            <p className="text-xl font-bold text-gray-800">{totalSessions}</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="flex items-center gap-5">
          <UserIcon className="h-10 w-10 text-white bg-red-400 p-2 rounded" />
          <div>
            <p className="text-gray-500 text-sm">Todays schedule</p>
            <p className="text-xl font-bold text-gray-800">{todaysSessions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

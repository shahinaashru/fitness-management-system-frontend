import React, { useEffect, useState } from "react";
import { getusersCountUnderTrainer } from "../../services/userServices";
export default function DashboardClientDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [age1825, setAge1825] = useState(0);
  const [age2635, setAge2635] = useState(0);
  const [age3645, setAge3645] = useState(0);
  const [female, setFemale] = useState(0);
  const [male, setMale] = useState(0);
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const res = await getusersCountUnderTrainer();
        setTotalUsers(res.data.totalUsers);
        setAge1825(res.data.age1825);
        setAge2635(res.data.age2635);
        setAge3645(res.data.age3645);
        setFemale(res.data.femaleCount);
        setMale(res.data.maleCount);
      } catch (err) {
        console.error(err);
        setError("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchUsersCount();
  }, []);
  return (
    <div>
      <div className="bg-blue-100 border rounded-2xl p-6 shadow-sm border-blue-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Total Clients</h2>
        </div>
        <div className="mt-4 flex items-end gap-4">
          <h1 className="text-5xl font-bold text-gray-900">{totalUsers}</h1>
          {/* <span className="flex items-center gap-1 text-green-700 font-semibold bg-green-100 px-2 py-1 rounded-full text-sm">
            ▲ 25%
          </span> */}
          {/* <span className="text-gray-600 text-sm">vs last month</span> */}
        </div>

        {/* MALE / FEMALE SPLIT */}
        <div className="mt-6 flex gap-6">
          <div className="p-4 rounded-xl w-40 bg-blue-200 text-center">
            <p className="text-sm text-gray-800">Male</p>
            <p className="text-2xl font-bold text-gray-900">{male}</p>
            {/* <p className="text-gray-700 text-sm">{male}%</p> */}
          </div>

          <div className="p-4 rounded-xl w-40 bg-pink-200 text-center">
            <p className="text-sm text-gray-800">Female</p>
            <p className="text-2xl font-bold text-gray-900">{female}</p>
            {/* <p className="text-gray-700 text-sm">{female}%</p> */}
          </div>
        </div>

        {/* AGE GROUP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Age 18-25 */}
          <div className="border rounded-xl p-5 bg-green-100 border-green-300 text-center">
            <h3 className="text-2xl font-bold text-gray-900">{age1825}</h3>
            <p className="text-gray-700 text-sm mt-1 whitespace-nowrap">
              Age 18-25
            </p>
            {/* <p className="text-sm mt-4 font-medium text-gray-800">35%</p> */}

            <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          {/* Age 26-35 */}
          <div className="border rounded-xl p-5 bg-yellow-100 border-yellow-300 text-center">
            <h3 className="text-2xl font-bold text-gray-900">{age2635}</h3>
            <p className="text-gray-700 text-sm mt-1 whitespace-nowrap">
              Age 26-35
            </p>
            {/* <p className="text-sm mt-4 font-medium text-gray-800">37.5%</p> */}

            <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          {/* Age 36-45 */}
          <div className="border rounded-xl p-5 bg-blue-200 border-blue-300 text-center">
            <h3 className="text-2xl font-bold text-gray-900">{age3645}</h3>
            <p className="text-gray-700 text-sm mt-1 whitespace-nowrap">
              Age 36-45
            </p>
            {/* <p className="text-sm mt-4 font-medium text-gray-800">27.5%</p> */}

            <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

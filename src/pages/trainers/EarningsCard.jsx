import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  getWeeklyEarnings,
  getDailyEarnings,
  getMonthlyEarnings,
} from "../../services/trainerServices";
export default function EarningsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const fetchWeeklyEarnings = async () => {
    try {
      const res = await getWeeklyEarnings();
      setWeeklyData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };
  const fetchDailyEarnings = async () => {
    try {
      const res = await getDailyEarnings();
      setDailyData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };
  const fetchMonthlyEarnings = async () => {
    try {
      const res = await getMonthlyEarnings();
      setMonthlyData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeeklyEarnings();
    fetchDailyEarnings();
    fetchMonthlyEarnings();
  }, []);
  const [filter, setFilter] = useState("month");

  return (
    <div className="bg-indigo-100 rounded-xl shadow p-10 w-full max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-700">Earnings</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm border border-indigo-600 bg-indigo-600 text-white rounded px-2 py-1"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      {filter === "week" && (
        <div className="space-y-3">
          {dailyData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-400 pb-2 text-gray-700"
            >
              <span>{item.date}</span>
              <span>${item.amount}</span>
            </div>
          ))}
        </div>
      )}
      {filter === "month" && (
        <div className="space-y-3">
          {weeklyData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-400 pb-2 text-gray-700"
            >
              <span>{item.week}</span>
              <span>${item.earnings}</span>
            </div>
          ))}
        </div>
      )}
      {filter === "year" && (
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

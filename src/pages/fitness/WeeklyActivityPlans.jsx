import React, { useEffect, useState } from "react";
import WeeklyPlan from "../../components/WeeklyPlan";
import {
  getFilteredWeeklyPlan,
  getUsersByOrder,
} from "../../services/userServices";

const WeeklyActivityPlans = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [filters, setFilters] = useState({
    userId: "",
    day: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersByOrder();
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchWeeklyPlan = async () => {
      if (!filters.userId) return;
      setLoading(true);
      setError(null);

      try {
        const res = await getFilteredWeeklyPlan(filters.userId, filters.day);
        const data = res.data.data || [];

        if (data.length === 0) {
          setPlanData([]);
          return;
        }

        const weeklyPlan = data[0].weeklyPlan || [];

        let daysToDisplay = [];

        if (filters.day) {
          // Only show selected day
          daysToDisplay = weeklyPlan.filter((d) => d.day === filters.day);
        } else {
          // Week not selected: show all days
          weeklyPlan.forEach((d) => {
            daysToDisplay.push(d);
          });
        }

        setPlanData(daysToDisplay);
      } catch (err) {
        console.error("Error fetching weekly plan:", err);
        setError("Failed to load weekly plan");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyPlan();
  }, [filters]);

  const handleUserChange = (e) =>
    setFilters({ ...filters, userId: e.target.value });
  const handleDayChange = (e) =>
    setFilters({ ...filters, day: e.target.value });

  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Weekly Fitness Plan
      </h1>

      {/* FILTERS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <select
          className="border border-gray-400 rounded p-2"
          onChange={handleUserChange}
          value={filters.userId}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullname}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-400 rounded p-2"
          onChange={handleDayChange}
          value={filters.day}
        >
          <option value="">Select Day</option>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>
      </div>

      {loading && <p className="">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && planData && <WeeklyPlan data={planData} />}
      {!loading && !error && !planData && (
        <p className="text-gray-500">No data for selected filters.</p>
      )}
    </div>
  );
};

export default WeeklyActivityPlans;

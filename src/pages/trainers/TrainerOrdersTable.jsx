import React, { useEffect, useState } from "react";
import { getTrainerOrders } from "../../services/trainerServices";

export default function TrainerOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(""); // YYYY-MM

  // Total earnings for selected month
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getTrainerOrders();
        if (res.data && res.data.Order) {
          setOrders(res.data.Order);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter by selected month
  useEffect(() => {
    if (!selectedMonth) {
      setFilteredOrders(orders);
      calculateTotalEarnings(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const date = new Date(order.createdAt);
      const orderMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      return orderMonth === selectedMonth;
    });

    setFilteredOrders(filtered);
    calculateTotalEarnings(filtered);
  }, [orders, selectedMonth]);

  // Calculate trainer total earnings
  const calculateTotalEarnings = (data) => {
    let total = 0;

    data.forEach((order) => {
      const program = order.program || {};
      const cost = program.cost || 0;
      const percent = program.trainerPercent || 70;

      if (order.paymentStatus === "success") {
        total += (cost * percent) / 100;
      }
    });

    setTotalEarnings(total);
  };

  if (loading) return <p className="p-10">Loading orders...</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Orders for Your Programs
        </h1>

        {/* Month Filter */}
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
      </div>

      {/* Top Earnings Display */}
      <div className="mb-6 p-4 bg-indigo-100 rounded-lg text-indigo-800 font-bold text-lg">
        Total Earnings: ${totalEarnings.toLocaleString()}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="p-10">No orders found for this month.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 bg-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Program
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium">
                  Total Cost
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium">
                  Trainer %
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium">
                  Admin %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredOrders.map((order) => {
                const program = order.program || {};
                const user = order.user || {};

                const total = program.cost || 0;
                const trainerPercent = program.trainerPercent || 70;
                const adminPercent = 100 - trainerPercent;

                return (
                  <tr key={order._id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-4">{user.fullname || "N/A"}</td>
                    <td className="px-6 py-4">
                      {program.program_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      ${total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-green-600 font-medium">
                      ${((total * trainerPercent) / 100).toLocaleString()} (
                      {trainerPercent}%)
                    </td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium">
                      ${((total * adminPercent) / 100).toLocaleString()} (
                      {adminPercent}%)
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1 inline-flex text-xs font-semibold rounded-full ${
                          order.paymentStatus === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        if (res.data && res.data.Order) {
          setOrders(res.data.Order);
          setLoading(false);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-10 text-gray-700">Loading orders...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;
  if (!orders.length)
    return <p className="p-10 text-gray-700">No orders found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => {
          const program = order.program || {};
          return (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {program.program_name || "Unknown Program"}
              </h2>

              {program.trainer && (
                <p className="text-gray-700 text-sm mb-1">
                  Trainer:{" "}
                  <span className="font-medium">
                    {program.trainer.fullname}
                  </span>
                </p>
              )}

              <div className="text-gray-600 text-sm mb-2">
                <p>Goal: {program.goal_type || "N/A"}</p>
                <p>Duration: {program.duration || "N/A"} weeks</p>
                <p>Sessions: {program.number_of_sessions || "N/A"}</p>
              </div>

              <div className="flex gap-2 flex-wrap mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Workout: {program.workout_plan || "N/A"}
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                  Nutrition: {program.nutrition_plan || "N/A"}
                </span>
              </div>

              <p className="text-green-600 font-semibold">
                Cost: ${program.cost ? program.cost.toLocaleString() : "N/A"}
              </p>

              <p className="text-gray-700 mt-1">
                Payment Status:{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus || "N/A"}
                </span>
              </p>

              <p className="text-gray-700 mt-1 text-xs">
                Purchased on:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

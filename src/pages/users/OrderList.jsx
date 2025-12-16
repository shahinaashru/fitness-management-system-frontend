import React, { useEffect, useState } from "react";
import OrderCard from "../../components/OrderCard";
import { getUserOrders } from "../../services/userServices";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        if (res.data && res.data.Order) {
          setOrders(res.data.Order);
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

  return (
    <div className="h-screen">
      <div className="p-5 grid gap-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersList;

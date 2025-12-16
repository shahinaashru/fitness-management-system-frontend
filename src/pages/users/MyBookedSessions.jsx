import { useEffect, useState } from "react";
import {
  getMySessions,
  makePaymentOnStripe,
} from "../../services/sessionService";
import { toast } from "react-toastify";

const MyBookedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  useEffect(() => {
    fetchPersonalSessions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sessions, statusFilter, paymentFilter]);

  const fetchPersonalSessions = async () => {
    try {
      setLoading(true);
      const res = await getMySessions();
      const sessionData = res?.data?.data;
      setSessions(Array.isArray(sessionData) ? sessionData : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sessions");
      setError("Failed to load sessions");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...sessions];

    if (statusFilter) {
      filtered = filtered.filter(
        (s) => s.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (paymentFilter) {
      filtered = filtered.filter(
        (s) =>
          (s.paymentStatus || "pending").toLowerCase() ===
          paymentFilter.toLowerCase()
      );
    }
    setFilteredSessions(filtered);
  };

  const handlePayment = async (sessionId) => {
    try {
      const response = await makePaymentOnStripe({ sessionId });
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

  const statusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-700";
    if (status === "booked") return "bg-yellow-100 text-yellow-700";
    if (status === "confirmed") return "bg-blue-100 text-blue-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  if (loading) return <p className="text-center py-10">Loading sessions...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg m-10 p-10 h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        My Booked Sessions
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-end gap-2 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm w-full md:w-32 bg-orange-500 text-white"
        >
          <option value="">All Status</option>
          <option value="booked">Booked</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="border rounded px-2 py-2 text-sm w-full md:w-40 bg-orange-500 text-white"
        >
          <option value="">All Payment Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No sessions found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Trainer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {session.trainerId?.fullname || "Unknown"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {session.programId?.program_name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {session.sessionDate
                      ? new Date(session.sessionDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {session.startTime || "N/A"} - {session.endTime || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {session.mode || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {session.mode === "in-person" ? session.location : "Online"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${session.cost || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                        session.status
                      )}`}
                    >
                      {session.status?.toUpperCase() || "UNKNOWN"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session.paymentStatus === "pending" &&
                    session.status === "confirmed" ? (
                      <button
                        onClick={() => handlePayment(session._id)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span
                        className={`text-sm font-semibold ${
                          session.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {session.paymentStatus
                          ? session.paymentStatus.charAt(0).toUpperCase() +
                            session.paymentStatus.slice(1)
                          : "Pending"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookedSessions;

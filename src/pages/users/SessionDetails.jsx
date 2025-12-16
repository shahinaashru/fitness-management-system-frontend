import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMySessionWithId } from "../../services/sessionService";
import { toast } from "react-toastify";

const SessionDetails = () => {
  const { id } = useParams();
  console.log("Received ID:", id);
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPersonalSessions();
  }, []);

  const fetchPersonalSessions = async () => {
    try {
      setLoading(true);
      const res = await getMySessionWithId(id);
      const sessionData = res?.data?.data;
      setSession(sessionData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load session");
      setError("Failed to load session");
      setSession([]);
    } finally {
      setLoading(false);
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

  if (loading) return <p className="text-center py-10">Loading session...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto h-screen">
      <h1 className="text-3xl font-bold mb-6">Personal Session Deatails</h1>

      {session.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No session found</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div
            key={session._id}
            className="bg-white shadow rounded-lg p-5 border  border-gray-400 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">
                Trainer: {session.trainerId?.fullname || "Unknown"}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                  session.status
                )}`}
              >
                {session.status?.toUpperCase() || "UNKNOWN"}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Date:</strong>{" "}
                {session.sessionDate
                  ? new Date(session.sessionDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Time:</strong> {session.startTime || "N/A"} -{" "}
                {session.endTime || "N/A"}
              </p>
              <p>
                <strong>Mode:</strong> {session.mode || "N/A"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {session.mode === "in-person" ? session.location : "Online"}
              </p>
              <p>
                <strong>Price:</strong> ${session.cost || 0}
              </p>
              <p>
                <strong>Notes:</strong> {session.notes || "None"}
              </p>
            </div>
            <div className="mt-5 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                Payment: {session.paymentStatus || "pending"}
              </span>
              {session.status === "confirmed" &&
                session.paymentStatus === "pending" && (
                  <button
                    onClick={() => handlePayment(session._id)}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Pay Now
                  </button>
                )}
              {session.paymentStatus === "paid" && (
                <span className="text-green-600 font-semibold">✅ Paid</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetails;

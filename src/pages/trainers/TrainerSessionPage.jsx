import { useEffect, useState } from "react";
import {
  CheckIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  getTrainerSessions,
  updateSessionStatus,
} from "../../services/sessionService";
import { toast } from "react-toastify";

const TrainerSessionPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainerSessions();
  }, []);

  const fetchTrainerSessions = async () => {
    try {
      setLoading(true);
      const res = await getTrainerSessions();
      const sessionData = res?.data?.data;
      setSessions(Array.isArray(sessionData) ? sessionData : []);
      console.log("Fetched sessions:", sessionData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sessions");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (sessionId, status) => {
    try {
      await updateSessionStatus(sessionId, status);
      toast.success(`Session ${status}`);
      fetchTrainerSessions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update session status");
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

  return (
    <div className="p-6 max-w-6xl mx-auto h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <CalendarDaysIcon className="w-6 h-6 text-indigo-600" />
        Trainer Sessions
      </h1>

      {Array.isArray(sessions) && sessions.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white shadow rounded-lg p-5 border border-gray-400 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  {session.userId?.fullname || "Unknown"}
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
                  <strong>Program:</strong>{" "}
                  {session.programId?.program_name || "N/A"}
                </p>
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
                  <strong>Notes:</strong> {session.notes || "None"}
                </p>
              </div>

              {/* Actions */}
              {session.status === "booked" && (
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate(session._id, "confirmed")}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    <CheckIcon className="w-5 h-5" />
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(session._id, "cancelled")}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              )}

              {/* Status Labels */}
              {session.status === "confirmed" && (
                <p className="mt-5 text-blue-600 font-semibold">Confirmed</p>
              )}
              {session.status === "cancelled" && (
                <p className="mt-5 text-red-600 font-semibold">Cancelled</p>
              )}
              {session.status === "completed" && (
                <p className="mt-5 text-green-600 font-semibold">Completed</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          No sessions scheduled
        </div>
      )}
    </div>
  );
};

export default TrainerSessionPage;

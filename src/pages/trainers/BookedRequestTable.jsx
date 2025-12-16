import React, { useEffect, useState } from "react";
import {
  getBookedSessions,
  updateSessionStatus,
} from "../../services/sessionService";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function BookedRequestTable() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getBookedSessions();
        setSessions(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);
  const handleStatusUpdate = async (sessionId, status) => {
    try {
      await updateSessionStatus(sessionId, status);
      toast.success(`Session ${status}`);
      const res = await getBookedSessions();
      setSessions(res?.data?.bookedSession || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update session status");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-500">Loading sessions...</div>
    );
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-t border-t border-gray-200 shadow-md p-6 w-full max-w-8xl mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Session Requests
        </h2>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full text-sm text-left text-gray-600">
          <thead className="border-b border-gray-100 text-gray-500">
            <tr>
              <th className="py-2">Client Name</th>
              <th className="py-2">Program</th>
              <th className="py-2">Mode</th>
              <th className="py-2">Location</th>
              <th className="py-2">Date</th>
              <th className="py-2">Start Time</th>
              <th className="py-2">End Time</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No booked sessions found.
                </td>
              </tr>
            ) : (
              sessions.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* Client Name + Avatar */}
                  <td className="py-3 flex items-center space-x-3">
                    <img
                      src={s?.userId?.image || "https://via.placeholder.com/40"}
                      alt={s?.userId?.fullname || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-800 font-medium">
                      {s?.userId?.fullname || "Unknown User"}
                    </span>
                  </td>
                  <td className="py-3 text-blue-500 font-medium">
                    {s?.programId.program_name || "-"}
                  </td>
                  <td className="py-3 text-blue-500 font-medium">
                    {s?.mode || "-"}
                  </td>
                  <td className="py-3 text-blue-500 font-medium">
                    {s?.location || "-"}
                  </td>

                  {/* Date */}
                  <td className="py-3">
                    {s?.sessionDate
                      ? new Date(s.sessionDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>

                  {/* Start Time */}
                  <td className="py-3 text-blue-500 font-medium">
                    {s?.startTime || "-"}
                  </td>

                  {/* End Time */}
                  <td className="py-3 text-blue-500 font-medium">
                    {s?.endTime || "-"}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(s._id, "confirmed")}
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-xl shadow-sm 
                        hover:bg-green-600 hover:shadow-md transition-all text-sm font-medium"
                    >
                      <CheckIcon className="w-4 h-4" />
                      Confirm
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(s._id, "cancelled")}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-xl shadow-sm 
                        hover:bg-red-600 hover:shadow-md transition-all text-sm font-medium"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

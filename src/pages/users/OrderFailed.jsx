import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
export default function OrderFailed() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios
        .post("/api/payment/update-status", { sessionId })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  }, [sessionId]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-green-600">Payment Failed!</h1>
      </div>
    </div>
  );
}

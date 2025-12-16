import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
export default function SesionSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("program_id");
  const [loading, setLoading] = useState(false);
  console.log(id);
  const handleViewDetails = () => {
    navigate(`/auth/user/selected-program/${id}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mt-3">
          Your order has been placed successfully.
        </p>

        {loading ? (
          <p className="text-gray-500 mt-4">Fetching order details...</p>
        ) : (
          <button
            onClick={handleViewDetails}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition font-medium"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

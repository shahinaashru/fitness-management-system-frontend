import React from "react";
const SelectedProgramDetails = ({ program }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {program.program_name}
        </h1>
        <img
          src={program.image || "https://via.placeholder.com/600x400"}
          alt={program.program_name}
          className="w-full h-64 object-cover rounded-lg shadow"
        />
        <div className="mt-6 space-y-4">
          <InfoRow label="Description" value={program.description} />
          <InfoRow label="Duration" value={`${program.duration} weeks`} />
          <InfoRow
            label="Suitable For"
            value={
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  program.suitable_for === "Beginner"
                    ? "bg-green-100 text-green-700"
                    : program.suitable_for === "Intermediate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {program.suitable_for}
              </span>
            }
          />
          <InfoRow label="Price" value={`$${program.cost}`} />
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-yellow-800 font-semibold mb-1">
              Trainer Assignment
            </p>
            <p>
              Your trainer{" "}
              <span className="font-bold">
                {program.trainer?.fullname || "Shahina"}
              </span>{" "}
              has been assigned. Your daily tasks will be assigned shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-gray-500">{label}</p>
    <p className="text-gray-800 mt-1">{value}</p>
  </div>
);

export default SelectedProgramDetails;

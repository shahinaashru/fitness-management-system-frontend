import React, { useState, useEffect } from "react";
import FitnessCard from "../../components/FitnessProgramCard";
import { getFitnessPrograms } from "../../services/fitnessService";
import { useSelector } from "react-redux";
export default function FitnessPrograms() {
  const [fitnessData, setFitnessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.user.user.role);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFitnessPrograms = async () => {
      try {
        getFitnessPrograms()
          .then((res) => {
            setFitnessData(res.data.fitness_programs);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.error("Error trainer data:", err);
        setError("Failed to load trainer data");
      } finally {
        setLoading(false);
      }
    };

    fetchFitnessPrograms();
  }, []);

  // Pagination logic
  const totalItems = fitnessData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fitnessData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // scroll to top on page change
  };

  return (
    <div className="max-w-8xl mx-auto bg-white p-12 rounded shadow h-screen my-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Popular Fitness Programs
      </h2>

      {/* Grid List */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(currentItems) &&
          currentItems.map((item) => (
            <FitnessCard key={item._id} item={item} />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded border ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded border transition
    ${
      currentPage === index + 1
        ? userRole === "user"
          ? "bg-orange-500 text-white border-orange-500"
          : userRole === "trainer"
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }
  `}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 rounded border ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

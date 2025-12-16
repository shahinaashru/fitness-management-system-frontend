import React, { useEffect, useState } from "react";
import { getProfile, getActivePrograms } from "../../services/userServices";
import { getMySessions } from "../../services/sessionService";
import bannerImg from "../../assets/image/bannerImage.webp";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DashboardCard from "../../components/DashboardCard";
import DashboardTopSection from "./DashboardTopSection";
import Trainers from "./Trainers";
import DashbordTodaysActivity from "./DashbordTodaysActivity";
const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "Inactive":
      return "bg-gray-100 text-gray-600";
    case "Waiting":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
};
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const fetchUserData = async () => {
    try {
      getProfile()
        .then((res) => {
          setUserData(res.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
  const fetchMySessions = async () => {
    try {
      getMySessions()
        .then((res) => {
          setSessionData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
  const fetchActivePrograms = async () => {
    try {
      getActivePrograms()
        .then((res) => {
          setPrograms(res.data.programs);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchActivePrograms();
    fetchMySessions();
  }, []);
  return (
    <div className="bg-white min-h-screen p-10 grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <DashboardTopSection />
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 md:p-12 flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="text-white md:w-1/2 z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Track Your Daily Activities
              </h2>
              <p className="text-sm md:text-base text-orange-100 leading-relaxed">
                Easily monitor your daily workouts, health progress, and fitness
                goals all in one place to stay motivated and consistent.
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-end">
              <img
                src={bannerImg}
                alt="Tracking daily fitness activities"
                className="w-64 md:w-80 rounded-xl object-cover"
              />
            </div>

            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-orange-500/20 pointer-events-none" />
          </div>
        </div>
        <DashboardCard />
        <div className="bg-white rounded shadow-md p-6 w-full max-w-8xl mt-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-800 font-semibold text-lg">
              Upcoming Personal Sessions
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="border-b border-gray-100 text-gray-500">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Satrt Time</th>
                  <th className="py-2">End Time</th>
                  <th className="py-2">Session Cost</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessionData
                  ?.filter((session) => {
                    const today = new Date();
                    const sessionDate = new Date(session.sessionDate);
                    return sessionDate >= today;
                  })
                  .map((session, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {/* Name + Avatar */}
                      <td className="py-3 flex items-center space-x-3">
                        <img
                          src={session.trainerId.image}
                          alt={session.trainerId.fullname}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-800 font-medium">
                          {session.trainerId.name}
                        </span>
                      </td>
                      <td className="py-3 text-blue-500 font-medium">
                        {new Date(session.sessionDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-blue-500 font-medium">
                        {session.startTime}
                      </td>
                      <td className="py-3 text-blue-500 font-medium">
                        {session.endTime}
                      </td>
                      <td className="py-3">{session.cost}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            session.status
                          )}`}
                        >
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Trainers />
      </div>
      <div className="border border-orange-100 rounded-[15px] shadow-md p-3 md:p-6 lg:p-8  bg-orange-200">
        <div className="space-y-4">
          {programs.map((program) => (
            <div
              key={program._id}
              className="rounded-2xl bg-orange-500 border border-orange-200 shadow-md p-6"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-orange-100">Active Program</p>
                  <p className="text-xl font-semibold text-white">
                    {program.program_name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-orange-100">Trainer Name</p>
                  <p className="text-lg font-semibold text-yellow-200">
                    {program.trainer?.fullname || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-orange-100 border border-orange-200 shadow-sm p-6">
          <h2 className="font-semibold text-lg text-orange-900 mb-4">
            Personal Info
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-orange-700">Height</p>
              <p className="text-xl font-bold text-orange-900">
                {userData.height}
                <span className="text-sm font-medium text-orange-700 ml-1">
                  cm
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-orange-700">Weight</p>
              <p className="text-xl font-bold text-orange-900">
                {userData.weight}
                <span className="text-sm font-medium text-orange-700 ml-1">
                  kg
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-orange-700">Age</p>
              <p className="text-xl font-bold text-orange-900">
                {userData.age}
                <span className="text-sm font-medium text-orange-700 ml-1">
                  yrs
                </span>
              </p>
            </div>
          </div>
        </div>

        <DashbordTodaysActivity />
      </div>
    </div>
  );
}

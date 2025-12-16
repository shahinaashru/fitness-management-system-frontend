import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/outline";
import ClientGraph from "../../components/ClientGraph";
import { getUsers } from "../../services/userServices";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        getUsers()
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

    fetchUserData();
  }, []);
  const people = [
    {
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      role: "Product Manager",
      lastSeen: "3h ago",
      lastSeenDateTime: "2025-11-12T14:00:00Z",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      role: "Software Engineer",
      lastSeen: null,
      lastSeenDateTime: null,
    },
    {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "UX Designer",
      lastSeen: "1d ago",
      lastSeenDateTime: "2025-11-11T09:30:00Z",
    },
  ];

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-[15px] shadow-md p-10 m-10 flex justify-evenly items-center">
        <div className="flex flex-cols gap-5">
          <UserIcon className="h-10 w-10 text-white bg-cyan-300 p-2 rounded" />
          <div>
            <p>Total Active Users</p>
            <p className="font-bold">100</p>
          </div>
        </div>
        <div className="flex flex-cols gap-5">
          <UserIcon className="h-10 w-10 text-white bg-orange-400 p-2 rounded" />
          <div>
            <p>Total Trainers</p>
            <p className="font-bold">100</p>
          </div>
        </div>
        <div className="flex flex-cols gap-5">
          <UserIcon className="h-10 w-10 text-white bg-purple-400 p-2 rounded" />
          <div>
            <p>Total Fitness Programs</p>
            <p className="font-bold">100</p>
          </div>
        </div>
        <div className="flex flex-cols gap-5">
          <UserIcon className="h-10 w-10 text-white bg-red-300 p-2 rounded" />
          <div>
            <p>Last Month Profits</p>
            <p className="font-bold">100</p>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-[15px] shadow-md p-10 m-10 flex justify-evenly items-center">
        <ClientGraph />
      </div>
      <div className="max-w-8xl mx-auto flex gap-10 px-10 m-10">
        <div className="flex-1 border border-gray-100 rounded-[15px] shadow-md p-10 bg-white">
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">
              New Users
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {Array.isArray(userData) &&
              userData.map((user) => (
                <li
                  key={user.email}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    {/* <img
                    alt=""
                    src={person.imageUrl}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  /> */}
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {user.email}
                      </p>
                      <p className="text-sm/6 text-gray-900">
                        {user.phone_number}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900">
                      {user.phone_number}
                    </p>
                    {user.lastSeen ? (
                      <p className="mt-1 text-xs/5 text-gray-500">
                        Last seen{" "}
                        <time dateTime={user.lastSeenDateTime}>
                          {user.lastSeen}
                        </time>
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs/5 text-gray-500">Online</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex-1 border border-gray-100 rounded-[15px] shadow-md p-10 bg-white">
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">
              New Trainers
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
              <li
                key={person.email}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900">{person.role}</p>
                  {person.lastSeen ? (
                    <p className="mt-1 text-xs/5 text-gray-500">
                      Last seen{" "}
                      <time dateTime={person.lastSeenDateTime}>
                        {person.lastSeen}
                      </time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs/5 text-gray-500">Online</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

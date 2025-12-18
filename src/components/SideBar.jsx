import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openChat } from "../redux/features/chatSlice";
import {
  PencilSquareIcon,
  HomeIcon,
  UserIcon,
  FolderIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserPlusIcon,
  PlusCircleIcon,
  BoltIcon,
  ClipboardDocumentListIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
import { persistor } from "../redux/store";
import { doLogout } from "../services/userServices";
export default function SideBar() {
  const user1 = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    try {
      console.log(user1);
      await doLogout();
      await persistor.purge();
      dispatch(logout());
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userRole = user.role;
  const menuItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      href: "./dashboard",
      roles: ["user", "admin", "trainer"],
    },
    {
      name: "Profile",
      icon: UserIcon,
      href: "./profile",
      roles: ["user", "trainer"],
    },
    { name: "My Clients", icon: UsersIcon, href: "./user", roles: ["trainer"] },
    {
      name: "Users Activity Status",
      icon: BoltIcon,
      href: "./users-daily-status",
      roles: ["trainer"],
    },
    {
      name: "Todays Activity Shedules",
      icon: CalendarDaysIcon,
      href: "./daily-activity",
      roles: ["user"],
    },
    {
      name: "OrderDetails",
      icon: ClipboardDocumentListIcon,
      href: "./order-details",
      roles: ["user"],
    },
    {
      name: "Add Weekly Plan",
      icon: PlusCircleIcon,
      href: "./add-weeklyplan",
      roles: ["trainer"],
    },
    {
      name: "Weekly Activity Plans",
      icon: ClipboardDocumentListIcon,
      href: "./weekly-activity-plans",
      roles: ["trainer"],
    },
    { name: "Users", icon: UsersIcon, href: "./user", roles: ["admin"] },
    {
      name: "Create User",
      icon: UserPlusIcon,
      href: "./create-user",
      roles: ["admin"],
    },
    {
      name: "Trainers",
      icon: UsersIcon,
      href: "./trainer",
      roles: ["admin", "user"],
    },
    {
      name: "Create Trainer",
      icon: UserPlusIcon,
      href: "./create-trainer",
      roles: ["admin"],
    },
    {
      name: "Fitness Programs",
      icon: ChartBarIcon,
      href: "./fitness-programs",
      roles: ["admin", "user", "trainer"],
    },
    {
      name: "My Fitness Programs",
      icon: ChartBarIcon,
      href: "./my-programs",
      roles: ["user"],
    },
    {
      name: "Add Fitness Program",
      icon: PlusCircleIcon,
      href: "./create-fitness-program",
      roles: ["admin", "trainer"],
    },
    {
      name: "Payment Details",
      icon: ClipboardDocumentListIcon,
      href: "#",
      roles: ["admin"],
    },
    {
      name: "Book Personel Session",
      icon: TicketIcon,
      href: "./book-session",
      roles: ["user"],
    },
    {
      name: "My Booked Sessions",
      icon: ClipboardDocumentListIcon,
      href: "./my-booked-sessions",
      roles: ["user"],
    },
    {
      name: "Orders Details",
      icon: ClipboardDocumentListIcon,
      href: "./trainer-orders-details",
      roles: ["trainer"],
    },
    {
      name: "Session Requests",
      icon: ClipboardDocumentListIcon,
      href: "./session-request",
      roles: ["trainer"],
    },
    { name: "Settings", icon: Cog6ToothIcon, href: "#", roles: ["admin"] },
    {
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      action: "chat",
      roles: ["user", "trainer"],
    },
  ];

  const visibleItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <aside className="fixed top-16 left-0 w-[250px] h-[calc(100vh-64px)] bg-gray-800 text-white overflow-y-auto z-40">
      <nav className="mt-6">
        <ul className="space-y-2">
          {visibleItems.map((item) => (
            <li key={item.name}>
              {item.action === "chat" ? (
                <button
                  onClick={() => dispatch(openChat())}
                  className="flex w-full items-center px-6 py-3 hover:bg-white/20 rounded-lg transition"
                >
                  <item.icon className="h-6 w-6 mr-3" />
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center px-6 py-3 hover:bg-white/20 rounded-lg transition"
                >
                  <item.icon className="h-6 w-6 mr-3" />
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-white/20">
        <button
          className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

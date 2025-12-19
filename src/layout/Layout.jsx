import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ChatWidget from "../components/ChatWidget";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Header />
      <div className="pt-16 flex">
        <SideBar />
        <main className="ml-[250px] p-6 w-full bg-gray-100">
          <Outlet />
        </main>
        <ChatWidget />
      </div>
    </div>
  );
}

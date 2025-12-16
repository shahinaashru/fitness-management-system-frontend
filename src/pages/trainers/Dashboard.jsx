import React from "react";
import DashboardCard from "../../components/DashboardCard";
import BookedRequestTable from "../trainers/BookedRequestTable";
import TodaysSession from "../trainers/TodaysSession";
import DashbordTopCountDiv from "../../components/DashbordTopCountDiv";
import EarningsCard from "./EarningsCard";
import DashboardClientDetails from "./DashboardClientDetails";
export default function Dashboard() {
  return (
    <div className="bg-white p-6 grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="p-6">
          <DashbordTopCountDiv />
        </div>
        <div className="p-6">
          <DashboardCard />
        </div>
        <div className="p-6">
          <BookedRequestTable />
        </div>
        <div className="p-6">
          <TodaysSession />
        </div>
      </div>
      <div className="border border-blue-100 rounded-[15px] shadow-md p-10 my-6 bg-blue-200">
        <div className="pt-0">
          <EarningsCard />
        </div>
        <div className="pt-10">
          <DashboardClientDetails />
        </div>
      </div>
    </div>
  );
}

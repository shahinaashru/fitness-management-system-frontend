import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { week: "Week 1", clients: 150 },
  { week: "Week 2", clients: 350 },
  { week: "Week 3", clients: 300 },
  { week: "Week 4", clients: 450 },
];

const filterOptions = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function ClientGraph() {
  const [filter, setFilter] = useState("Yearly");

  // For demo, same data shown regardless of filter
  // You can update this to change data based on filter

  return (
    <div className="bg-white rounded-lg p-6  mx-auto w-full max-w-none">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 font-semibold">Total Clients 2020-2021</h2>
        <select
          className="border rounded px-3 py-1 text-sm bg-white cursor-pointer"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e0aaff" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#e0aaff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="week" tick={{ fill: "#999" }} />
          <YAxis tick={{ fill: "#999" }} />
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="clients"
            stroke="#a855f7" // Purple line
            fillOpacity={1}
            fill="url(#colorClients)"
            dot={{ stroke: "#a855f7", strokeWidth: 2, r: 5, fill: "white" }}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

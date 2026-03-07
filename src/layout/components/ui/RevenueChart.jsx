import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", revenue: 7000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 6000 },
  { name: "Apr", revenue: 4000 },
  { name: "May", revenue: 8000 },
  { name: "Jun", revenue: 7000 }
];

function RevenueChart() {
  return (
    <div className="bg-white p-5 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-4">Revenue Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
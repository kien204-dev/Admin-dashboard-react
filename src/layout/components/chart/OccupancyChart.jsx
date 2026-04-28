import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 58 },
  { month: "Apr", value: 81 },
  { month: "May", value: 76 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 84 },
  { month: "Aug", value: 70 },
  { month: "Sep", value: 88 },
  { month: "Oct", value: 92 },
  { month: "Nov", value: 79 },
  { month: "Dec", value: 85 },
];

export default function OccupancyChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(64,72,93,0.25)" />
        <XAxis dataKey="month" stroke="#5a6480" />
        <YAxis stroke="#5a6480" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#9fa7ff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../layout/components/Sidebar";
import Icon from "../utils/icon";
import RevenueChart from "../layout/components/chart/RevenueChart";
import OccupancyChart from "../layout/components/chart/OccupancyChart";
import BookingStatusChart from "../layout/components/chart/BookingStatusChart";


// ─── Static Data ──────────────────────────────────────────────────────────────
const bookingStatusData = [
  { name: "Confirmed", value: 65 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 15 },
];

const COLORS = ["#67e8b4", "#fbbf24", "#f87171"];


const recentBookings = [
  { id: "#BK-0091", guest: "Nguyễn Văn A", room: "Deluxe Suite 401", checkIn: "Apr 15", checkOut: "Apr 18", status: "confirmed", amount: "$540" },
  { id: "#BK-0090", guest: "Trần Thị B", room: "Ocean View 202", checkIn: "Apr 14", checkOut: "Apr 16", status: "pending", amount: "$320" },
  { id: "#BK-0089", guest: "Lê Minh C", room: "Presidential 801", checkIn: "Apr 13", checkOut: "Apr 20", status: "confirmed", amount: "$2,100" },
  { id: "#BK-0088", guest: "Phạm Thị D", room: "Standard 105", checkIn: "Apr 12", checkOut: "Apr 13", status: "completed", amount: "$150" },
  { id: "#BK-0087", guest: "Hoàng Văn E", room: "Junior Suite 312", checkIn: "Apr 11", checkOut: "Apr 15", status: "cancelled", amount: "$480" },
];

const occupancy = [65, 72, 58, 81, 76, 90, 84, 70, 88, 92, 79, 85];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const revenueData = [
  12000, 15000, 18000, 22000,
  25000, 27000, 30000, 28000,
  32000, 35000, 37000, 40000
];

const statusStyle = {
  confirmed: { bg: "rgba(103,232,180,0.12)", color: "#67e8b4", label: "Confirmed" },
  pending: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24", label: "Pending" },
  completed: { bg: "rgba(159,167,255,0.12)", color: "#9fa7ff", label: "Completed" },
  cancelled: { bg: "rgba(248,113,113,0.12)", color: "#f87171", label: "Cancelled" },
};


// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, change, up, icon, color }) {
  const IconComp = Icon[icon];
  return (
    <div style={{
      background: "rgba(25,37,64,0.6)",
      border: "1px solid rgba(64,72,93,0.3)",
      borderRadius: 16, padding: "20px 24px",
      backdropFilter: "blur(16px)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 90, height: 90, background: color,
        borderRadius: "50%", opacity: 0.07, filter: "blur(20px)",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "#a3aac4", fontSize: 11, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
          <p style={{ color: "#dee5ff", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{value}</p>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `${color}1a`,
          display: "flex", alignItems: "center", justifyContent: "center", color,
        }}>
          <IconComp />
        </div>
      </div>
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: up ? "#67e8b4" : "#f87171", display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 600 }}>
          {up ? <Icon.TrendUp /> : <Icon.TrendDown />}
          {change}
        </span>
        <span style={{ color: "#5a6480", fontSize: 12 }}>vs last month</span>
      </div>
    </div>
  );
}

export default function Dashboard() {

const [users, setUsers] = useState([]);
const [orders, setOrders] = useState([]);

useEffect(() => {
  const fakeData = () => {
    return {
      users: [{ id: 1 }, { id: 2 }, { id: 3 }],
      orders: [
        { amount: 200, status: "completed" },
        { amount: 300, status: "completed" },
        { amount: 100, status: "pending" },
      ],
    };
  };
  setUsers(data.users);
  setOrders(data.orders);
}, []);

const totalUsers = users?.length || 0;
const totalOrders = orders?.length || 0;
const totalRevenue = (orders || [])
  .filter(o => o.status === "completed")
  .reduce((sum, o) => sum + o.amount, 0);

  const stats = [
  {
    label: "Total Revenue",
    value: totalRevenue.toLocaleString() + " ₫",
    change: "+12.5%",
    up: true,
    icon: "Revenue",
    color: "#9fa7ff",
  },
  {
    label: "Total Orders",
    value: totalOrders,
    change: "+8.2%",
    up: true,
    icon: "Booking",
    color: "#67e8b4",
  },
  {
    label: "Users",
    value: totalUsers,
    change: "+5.1%",
    up: true,
    icon: "Users",
    color: "#f9a8d4",
  },
];

  const [bookingStatus, setBookingStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeApi = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { name: "Confirmed", value: 65 },
            { name: "Pending", value: 20 },
            { name: "Cancelled", value: 15 },
          ]);
        }, 1000);
      });
    };

    fakeApi().then((data) => {
      setBookingStatus(data);
      setLoading(false);
    });
  }, []);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Doanh thu",
        data: occupancy,
        borderColor: "#9fa7ff",
        backgroundColor: "rgba(159,167,255,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "Dashboard" },
    { id: "booking", label: "Bookings", icon: "Booking" },
    { id: "users", label: "Users", icon: "Users" },
    { id: "orders", label: "Orders", icon: "Orders" },
    { id: "settings", label: "Settings", icon: "Settings" },
  ];

  return (
    <div style={{
      background: "#060e20", minHeight: "100vh", color: "#dee5ff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      display: "flex", position: "relative", overflow: "hidden",
    }}>
      {/* Orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, background: "#9fa7ff", borderRadius: "50%", filter: "blur(100px)", opacity: 0.12 }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-5%", width: 600, height: 600, background: "#62259b", borderRadius: "50%", filter: "blur(100px)", opacity: 0.12 }} />
      </div>

      {/* ── Sidebar ── */}

      <Sidebar Icon={Icon} />
      {/* ── Main Content ── */}
      <main style={{ flex: 1, padding: "28px 32px", marginLeft: 240, overflowY: "auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#dee5ff", margin: 0, letterSpacing: "-0.02em" }}>Admin Dashboard</h1>
            <p style={{ color: "#5a6480", fontSize: 13, margin: "4px 0 0" }}>Wednesday, April 15, 2026</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button style={{
              width: 38, height: 38, borderRadius: 10,
              border: "1px solid rgba(64,72,93,0.4)",
              background: "rgba(25,37,64,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#a3aac4", cursor: "pointer", position: "relative",
            }}>
              <Icon.Bell />
              <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, background: "#f87171", borderRadius: "50%", border: "1.5px solid #060e20" }} />
            </button>
            <button style={{
              padding: "8px 20px", borderRadius: 20,
              background: "linear-gradient(135deg,#9fa7ff,#8a95ff)",
              border: "none", color: "#060e20",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>+ New Booking</button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Chart Section */}
        <div style={{
          background: "rgba(25,37,64,0.6)",
          border: "1px solid rgba(64,72,93,0.3)",
          borderRadius: 16,
          padding: "24px 28px",
          backdropFilter: "blur(16px)",
          marginBottom: 24,
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#dee5ff" }}>
                Room Occupancy
              </h2>
              <p style={{ margin: "4px 0 0", color: "#5a6480", fontSize: 12 }}>
                Monthly rate — 2026
              </p>
            </div>
            <span style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(103,232,180,0.12)",
              color: "#67e8b4",
              fontSize: 12,
              fontWeight: 600,
            }}>
              Avg 78%
            </span>
          </div>

          {/* LINE CHART */}
          <div style={{ height: 240 }}>
            <OccupancyChart />
          </div>
        </div>

        {/* Recent Bookings */}
        <div style={{
          background: "rgba(25,37,64,0.6)",
          border: "1px solid rgba(64,72,93,0.3)",
          borderRadius: 16, padding: 24, backdropFilter: "blur(16px)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#dee5ff" }}>Recent Bookings</h2>
            <button style={{
              background: "transparent",
              border: "1px solid rgba(159,167,255,0.25)",
              color: "#9fa7ff", borderRadius: 8,
              padding: "5px 14px", fontSize: 12, cursor: "pointer",
            }}>View all</button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Booking ID", "Guest", "Room", "Check-in", "Check-out", "Status", "Amount"].map(h => (
                    <th key={h} style={{
                      padding: "8px 12px", textAlign: "left",
                      fontSize: 11, color: "#5a6480",
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      borderBottom: "1px solid rgba(64,72,93,0.3)",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => {
                  const s = statusStyle[b.status];
                  return (
                    <tr key={b.id} style={{ borderBottom: "1px solid rgba(64,72,93,0.15)" }}>
                      <td style={{ padding: "12px", fontSize: 13, color: "#9fa7ff", fontWeight: 600 }}>{b.id}</td>
                      <td style={{ padding: "12px", fontSize: 13, color: "#dee5ff" }}>{b.guest}</td>
                      <td style={{ padding: "12px", fontSize: 13, color: "#a3aac4" }}>{b.room}</td>
                      <td style={{ padding: "12px", fontSize: 13, color: "#a3aac4" }}>{b.checkIn}</td>
                      <td style={{ padding: "12px", fontSize: 13, color: "#a3aac4" }}>{b.checkOut}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color, fontSize: 11, fontWeight: 600 }}>{s.label}</span>
                      </td>
                      <td style={{ padding: "12px", fontSize: 13, color: "#dee5ff", fontWeight: 600 }}>{b.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{

          marginTop: 24,
          background: "rgba(25,37,64,0.6)",
          border: "1px solid rgba(64,72,93,0.3)",
          borderRadius: 16,
          padding: 24,
        }}>
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#dee5ff" }}>
              Revenue Overview
            </h3>
          </div>
          <RevenueChart data={revenueData} labels={months} />
        </div>
          <div style={{
            marginTop: 20,
            background: "rgba(25,37,64,0.6)",
            border: "1px solid rgba(64,72,93,0.3)",
            borderRadius: 16,
            padding: 20,
          }}>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#dee5ff" }}>
                Booking Status
              </h3>
            </div>

            {loading ? (
              <p>Loading chart...</p>
            ) : (
              <BookingStatusChart data={bookingStatus} />
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            {bookingStatusData.length > 0 && bookingStatusData.map((item, index) => (
              <div key={item.name} style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 13,
                color: "#a3aac4"
              }}>
                <span>
                  <span style={{
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: COLORS[index],
                    marginRight: 6
                  }} />
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
      </main>
    </div>
  );
}

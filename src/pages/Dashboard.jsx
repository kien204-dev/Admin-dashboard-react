import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../layout/components/Sidebar";
import Icon from "../utils/icon";

// ─── Static Data ──────────────────────────────────────────────────────────────
const stats = [
  { label: "Total Revenue", value: "$124,580", change: "+12.5%", up: true, icon: "Revenue", color: "#9fa7ff" },
  { label: "Total Bookings", value: "1,284", change: "+8.2%", up: true, icon: "Booking", color: "#67e8b4" },
  { label: "Active Users", value: "3,921", change: "+5.1%", up: true, icon: "Users", color: "#f9a8d4" },
  { label: "Cancellations", value: "47", change: "-3.4%", up: false, icon: "Orders", color: "#fbbf24" },
];

const recentBookings = [
  { id: "#BK-0091", guest: "Nguyễn Văn A", room: "Deluxe Suite 401", checkIn: "Apr 15", checkOut: "Apr 18", status: "confirmed", amount: "$540" },
  { id: "#BK-0090", guest: "Trần Thị B", room: "Ocean View 202", checkIn: "Apr 14", checkOut: "Apr 16", status: "pending", amount: "$320" },
  { id: "#BK-0089", guest: "Lê Minh C", room: "Presidential 801", checkIn: "Apr 13", checkOut: "Apr 20", status: "confirmed", amount: "$2,100" },
  { id: "#BK-0088", guest: "Phạm Thị D", room: "Standard 105", checkIn: "Apr 12", checkOut: "Apr 13", status: "completed", amount: "$150" },
  { id: "#BK-0087", guest: "Hoàng Văn E", room: "Junior Suite 312", checkIn: "Apr 11", checkOut: "Apr 15", status: "cancelled", amount: "$480" },
];

const occupancy = [65, 72, 58, 81, 76, 90, 84, 70, 88, 92, 79, 85];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const statusStyle = {
  confirmed: { bg: "rgba(103,232,180,0.12)", color: "#67e8b4", label: "Confirmed" },
  pending: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24", label: "Pending" },
  completed: { bg: "rgba(159,167,255,0.12)", color: "#9fa7ff", label: "Completed" },
  cancelled: { bg: "rgba(248,113,113,0.12)", color: "#f87171", label: "Cancelled" },
};

// ─── Bar Chart ────────────────────────────────────────────────────────────────
function BarChart() {

  const location = useLocation();

  const max = Math.max(...occupancy);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 108 }}>
      {occupancy.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div
            title={`${months[i]}: ${v}%`}
            style={{
              width: "100%",
              height: `${(v / max) * 90}px`,
              background: i === 9
                ? "linear-gradient(180deg,#9fa7ff,#6c77ff)"
                : "rgba(159,167,255,0.18)",
              borderRadius: 4,
              cursor: "pointer",
            }}
          />
          <span style={{ fontSize: 9, color: "#5a6480", fontFamily: "monospace" }}>{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

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

        {/* Chart + Room Status */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, marginBottom: 24 }}>

          <div style={{
            background: "rgba(25,37,64,0.6)",
            border: "1px solid rgba(64,72,93,0.3)",
            borderRadius: 16, padding: 24, backdropFilter: "blur(16px)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#dee5ff" }}>Room Occupancy</h2>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#5a6480" }}>Monthly rate — 2026</p>
              </div>
              <span style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(103,232,180,0.12)", color: "#67e8b4", fontSize: 12, fontWeight: 600 }}>Avg 78%</span>
            </div>
            <BarChart />
          </div>

          <div style={{
            background: "rgba(25,37,64,0.6)",
            border: "1px solid rgba(64,72,93,0.3)",
            borderRadius: 16, padding: 24, backdropFilter: "blur(16px)",
          }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: "#dee5ff" }}>Room Status</h2>
            {[
              { label: "Occupied", count: 64, color: "#9fa7ff", pct: 64 },
              { label: "Available", count: 22, color: "#67e8b4", pct: 22 },
              { label: "Maintenance", count: 8, color: "#fbbf24", pct: 8 },
              { label: "Reserved", count: 6, color: "#f9a8d4", pct: 6 },
            ].map(({ label, count, color, pct }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#a3aac4" }}>{label}</span>
                  <span style={{ fontSize: 12, color, fontWeight: 600 }}>{count}</span>
                </div>
                <div style={{ height: 5, borderRadius: 4, background: "rgba(64,72,93,0.4)" }}>
                  <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: color, opacity: 0.85 }} />
                </div>
              </div>
            ))}
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
      </main>
    </div>
  );
}

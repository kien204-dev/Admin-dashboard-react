import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Icon = {
  Hotel: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Orders: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Revenue: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  TrendUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  TrendDown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Booking: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

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

  const [activePage, setActivePage] = useState("dashboard");

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
      <aside style={{
        width: 240,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        background: "rgba(10,18,38,0.85)",
        backdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(64,72,93,0.3)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        zIndex: 10
      }}>
        {/* Logo */}
        <div onClick={() => navigate("/login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 8px 28px",
            cursor: "pointer" // 👈 thêm dòng này
          }}>
          <span style={{ color: "#9fa7ff" }}><Icon.Hotel /></span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#9fa7ff", letterSpacing: "-0.02em" }}>LuxeStay</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {navItems.map(({ id, label, icon }) => {
            const IconComp = Icon[icon];
            const active = activePage === id;
            return (
              <button key={id} onClick={() => setActivePage(id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10,
                border: "none", cursor: "pointer",
                background: active ? "rgba(159,167,255,0.12)" : "transparent",
                color: active ? "#9fa7ff" : "#5a6480",
                fontWeight: active ? 600 : 400, fontSize: 14,
                textAlign: "left", width: "100%",
                borderLeft: active ? "2px solid #9fa7ff" : "2px solid transparent",
                transition: "all 0.2s",
              }}>
                <IconComp />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div style={{
          background: "rgba(159,167,255,0.08)",
          border: "1px solid rgba(159,167,255,0.15)",
          borderRadius: 12, padding: "12px 14px",
          display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg,#9fa7ff,#62259b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>A</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#dee5ff", margin: 0 }}>Admin</p>
            <p style={{ fontSize: 11, color: "#5a6480", margin: 0 }}>admin@gmail.com</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "#f87171",
            cursor: "pointer",
            fontSize: 14,
            width: "100%",
          }}
        >
          <Icon.Logout /> Logout
        </button>
      </aside>

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

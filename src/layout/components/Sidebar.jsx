import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../../utils/icon";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "", label: "Dashboard", icon: "Dashboard" }, // "/" root
    { id: "booking", label: "Bookings", icon: "Booking" },
    { id: "users", label: "Users", icon: "Users" },
    { id: "orders", label: "Orders", icon: "Orders" },
    { id: "settings", label: "Settings", icon: "Settings" },
  ];

  return (
    <aside
      style={{
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
        zIndex: 10,
      }}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 8px 28px",
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#9fa7ff" }}>
          <Icon.Hotel />
        </span>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#9fa7ff" }}>
          LuxeStay
        </span>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(({ id, label, icon }) => {
          const IconComp = Icon[icon];

          // ✅ FIX: dùng startsWith
          const active =
            id === ""
              ? location.pathname === "/"
              : location.pathname.startsWith(`/${id}`);

          return (
            <button
              key={id}
              onClick={() => navigate(id ? `/${id}` : "/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: active
                  ? "rgba(159,167,255,0.12)"
                  : "transparent",
                color: active ? "#9fa7ff" : "#5a6480",
                fontWeight: active ? 600 : 400,
                borderLeft: active
                  ? "2px solid #9fa7ff"
                  : "2px solid transparent",
              }}
            >
              {/* ✅ FIX: fallback icon tránh crash */}
              {IconComp ? <IconComp /> : <span>•</span>}
              {label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          borderRadius: 10,
          background: "transparent",
          color: "#f87171",
          cursor: "pointer",
          border: "none",
        }}
      >
        <Icon.Logout />
        <span>Logout</span>
      </button>
    </aside>
  );
}
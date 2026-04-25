import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ role }) {
  const { user, loading } = useAuth(); // ← lấy loading

  // Đang đọc localStorage — chờ
  if (loading) return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#0f1117",
      color: "#fff",
      fontSize: "14px",
    }}>
      Loading...
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/booking" replace />;

  return <Outlet />;
}

export default PrivateRoute;
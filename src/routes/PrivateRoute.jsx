import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  // chưa login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // nếu có yêu cầu role
  if (role && user.role !== role) {
    return <Navigate to="/booking" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
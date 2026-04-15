import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Booking from "../pages/Booking";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Admin only */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute role="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* User + Admin */}
      <Route
        path="/booking"
        element={
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        }
      />

      {/* Các route khác (có thể thêm role nếu cần) */}
      <Route path="/users" element={<Users />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/settings" element={<Settings />} />

    </Routes>
  );
}

export default AppRoutes;
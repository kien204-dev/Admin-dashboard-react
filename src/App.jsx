import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";
import BookingForm from "./pages/BookingForm";
import Booking from "./pages/Booking";

import { Routes, Route } from "react-router-dom";

function App() {
  const username = "Kiên";

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/booking" element={<Booking />} />  {/* ← THÊM DÒNG NÀY */}

      {/* PROTECTED ROUTES */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout username="Kiên" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
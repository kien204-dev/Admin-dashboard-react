import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Orders from "./pages/Order";

import { Routes, Route } from "react-router-dom";

function App() {
  const username = "Kiên";

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Layout route */}
      <Route
        element={
          <MainLayout username={username} title="Admin Dashboard" />
        }
      >

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}

export default App;
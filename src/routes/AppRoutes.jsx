import { Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Dashboard from "../pages/Dashboard"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default AppRoutes
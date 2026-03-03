import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const username = "Kiên";

  return (
    <BrowserRouter>
      <Routes>

        {/* Trang login không có layout */}
        <Route path="/login" element={<Login />} />

        {/* Các trang có layout */}
        <Route
          path="/dashboard"
          element={
            <Layout username={username} title="Admin Dashboard">
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/users"
          element={
            <Layout username={username} title="Admin Dashboard">
              <Users />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
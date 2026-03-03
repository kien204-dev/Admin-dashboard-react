import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const username = "Kiên";

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <MainLayout username={username} title="Admin Dashboard">
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/users"
          element={
            <MainLayout username={username} title="Admin Dashboard">
              <Users />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
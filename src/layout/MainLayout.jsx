import Navbar from "../layout/components/Navbar";
import Sidebar from "../layout/components/Sidebar";
import Orders from "../pages/Orders";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout({ username, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-col min-h-screen w-full">

        <main className="flex-1 overflow-auto bg-[#0f172a] text-white">
  <div >
    <Outlet />
  </div>
</main>

      </div>

    </div>
  );
}

export default MainLayout;
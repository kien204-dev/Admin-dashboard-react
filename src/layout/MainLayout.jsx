import Navbar from "../layout/components/Navbar";
import Sidebar from "../layout/components/Sidebar";
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

        <Navbar
          username={username}
          title={title}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-3 md:p-6 flex-1 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;
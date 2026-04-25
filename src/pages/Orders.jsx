import React, { useEffect } from "react";
import Sidebar from "../layout/components/Sidebar";

export default function App() {
  // set dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-[#ecedf6] font-body gap-5">
      <div style={{ width: 220 }}>
        {/* sidebar */}
      </div>



      {/* Main */}
      <main className="flex-1 flex flex-col">

        {/* Content */}
        <div className="p-6 space-y-6">

          <h1 className="text-3xl font-bold">Active Orders</h1>

          {/* Card */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-[#161a21] p-6 rounded-xl">
              <p className="text-sm text-gray-400">Revenue</p>
              <h2 className="text-2xl font-bold">$142,850</h2>
            </div>

            <div className="bg-[#161a21] p-6 rounded-xl">
              <p className="text-sm text-gray-400">Pending</p>
              <h2 className="text-2xl font-bold">24</h2>
            </div>

            <div className="bg-[#161a21] p-6 rounded-xl">
              <p className="text-sm text-gray-400">Orders</p>
              <h2 className="text-2xl font-bold">118</h2>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
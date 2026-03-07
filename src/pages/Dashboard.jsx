import React from "react";
import RevenueChart from "../layout/components/ui/RevenueChart";
import Card from "../layout/components/ui/Card";
import Button from "../layout/components/commom/Button";
import Table from "../layout/components/Table";

function Dashboard() {
  const users = [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "a@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Tran Van B",
      email: "b@gmail.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Le Van C",
      email: "c@gmail.com",
      role: "User",
      status: "Active",
    },
  ];

  return (
    <div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card title="Total Users" value="103" icon="👥" color="text-indigo-500" />
        <Card title="Revenue" value="$5,200" icon="💰" color="text-green-500" />
        <Card title="Orders" value="320" icon="🛒" color="text-yellow-500" />
        <Card title="Messages" value="85" icon="💬" color="text-red-500" />

      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4 items-center flex-wrap">

        <Button type="primary">➕ Add User</Button>

        <Button type="secondary">📤 Export</Button>

        <Button type="danger">🗑 Delete</Button>

      </div>

      {/* Chart */}
      <div className="mt-8">
        <RevenueChart />
      </div>

      {/* Table */}
      <div className="mt-8">

        <h2 className="text-xl font-bold mb-4">User List</h2>

        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <Table data={users} />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
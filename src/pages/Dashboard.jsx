import React, { useState, useEffect } from "react";

function Dashboard() {
  const [users, setUsers] = useState(100);

  useEffect(() => {
    console.log("Dashboard loaded");
  }, []);

  useEffect(() => {
    console.log("Users changed:", users);
  }, [users]);

  return (
    <div>
      <h1>Welcome to Dashboard 🚀</h1>
      <p>Đây là nội dung chính</p>

      <h2>Users: {users}</h2>
      <button onClick={() => setUsers(users + 1)}>
        Tăng Users
      </button>
    </div>
  );
}

export default Dashboard;
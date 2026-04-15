import { useEffect, useState } from "react";
import api from "../services/api";
import { getUsers } from "../services/userService";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    api.get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });

  }, []);

  return (
    <div>

      <h1 className="text-xl font-bold mb-4">
        Users
      </h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="border p-3 mb-2 rounded"
        >
          {user.name} - {user.email}
        </div>
      ))}

    </div>
  );
}

export default Users;
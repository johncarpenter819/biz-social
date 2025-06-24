import React, { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.username}</td>
              <td>{u.role === "admin" ? "Department Admin" : "Employee"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

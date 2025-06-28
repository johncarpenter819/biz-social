import React, { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) setUsers(JSON.parse(stored));
  }, []);

  const handleChange = (index, field, value) => {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers];
      newUsers[index] = { ...newUsers[index], [field]: value };
      return newUsers;
    });
  };

  const handleSave = () => {
    localStorage.setItem("users", JSON.stringify(users));
    alert("Users updated!");
  };

  return (
    <div>
      <h2>All Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th><th>Last Name</th><th>Username</th><th>Role</th>
            <th>Email</th><th>Phone Number</th><th>Years with Company</th><th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => {
            const yearsWithCompany = u.startDate
              ? Math.floor((new Date() - new Date(u.startDate)) / (1000 * 60 * 60 * 24 * 365))
              : "N/A";
            return (
              <tr key={i}>
                <td><input type="text" value={u.firstName || ""} onChange={e => handleChange(i, "firstName", e.target.value)} placeholder="First Name" /></td>
                <td><input type="text" value={u.lastName || ""} onChange={e => handleChange(i, "lastName", e.target.value)} placeholder="Last Name" /></td>
                <td>{u.username}</td>
                <td>
                  <select value={u.role} onChange={e => handleChange(i, "role", e.target.value)}>
                    <option value="employee">Employee</option>
                    <option value="admin">Department Admin</option>
                  </select>
                </td>
                <td><input type="email" value={u.email || ""} onChange={e => handleChange(i, "email", e.target.value)} placeholder="Email" /></td>
                <td><input type="tel" value={u.phone || ""} onChange={e => handleChange(i, "phone", e.target.value)} placeholder="Phone" /></td>
                <td>{yearsWithCompany}</td>
                <td><input type="date" value={u.birthday ? u.birthday.split("T")[0] : ""} onChange={e => handleChange(i, "birthday", e.target.value)} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleSave} style={{ marginTop: "1rem" }}>
        Save Changes
      </button>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Admin</h2>

      <ul style={styles.menu}>
        <li>
          <NavLink to="/dashboard" style={navStyle}>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/users" style={navStyle}>
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  color: isActive ? "yellow" : "white",
  textDecoration: "none",
  display: "block",
  padding: "8px 0"
});

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "20px"
  },
  menu: {
    listStyle: "none",
    padding: 0
  }
};

export default Sidebar;
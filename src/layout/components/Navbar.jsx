import React from "react";

function Navbar({ username, title }) {
  return (
    <div style={styles.navbar}>
      <h3>{title}</h3>
      <div>👤 {username}</div>
    </div>
  );
}


const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #ddd"
  }
};

export default Navbar;

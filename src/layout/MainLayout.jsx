import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function MainLayout({ children, username, title }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar username={username} title={title} />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex"
    
  },
  main: {
    flex: 1
  },
  content: {
    padding: "20px"
  }
};

export default MainLayout;
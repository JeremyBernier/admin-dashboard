"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className={`layout-container ${!showSidebar ? "sidebar-closed" : ""}`}>
      <Sidebar toggleSidebar={toggleSidebar} />
      <Header />
      <main className="main-content">
        {/* <div>
          <button onClick={toggleSidebar}>toggle</button>
        </div> */}
        {children}
      </main>
      {/* <footer className="footer">Footer</footer> */}
    </div>
  );
};

export default Layout;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    padding: "10px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#fff" : "#374151",
    background: isActive ? "#2563eb" : "transparent",
    fontSize: "14px",
    fontWeight: 500,
    display: "block",
  });

  const subLinkStyle = {
    padding: "8px 28px",
    fontSize: "13px",
    color: "#4b5563",
    textDecoration: "none",
    display: "block",
  };

  return (
    <div
      style={{
        width: "230px",
        background: "#ffffff",
        padding: "20px",
        borderRight: "1px solid #e5e7eb",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "24px" }}>
        💰 Expense Tracker
      </h2>

      {/* Dashboard */}
      <NavLink to="/dashboard" style={linkStyle}>
        Dashboard
      </NavLink>

      {/* Add Section */}
      <div
        onClick={() => setOpenAdd(!openAdd)}
        style={{
          padding: "10px 14px",
          cursor: "pointer",
          fontWeight: 500,
          color: "#374151",
        }}
      >
        ➕ Add
      </div>

      {openAdd && (
        <div style={{ marginBottom: "8px" }}>
          <NavLink to="/add-income" style={subLinkStyle}>
            Add Income
          </NavLink>
          <NavLink to="/add-expense" style={subLinkStyle}>
            Add Expense
          </NavLink>
        </div>
      )}

      {/* Transactions */}
      <NavLink to="/transactions" style={linkStyle}>
        📄 Transactions
      </NavLink>

      {/* Reports */}
      <div
        onClick={() => setOpenReports(!openReports)}
        style={{
          padding: "10px 14px",
          cursor: "pointer",
          fontWeight: 500,
          color: "#374151",
        }}
      >
        📊 Reports
      </div>

      {openReports && (
        <div style={{ marginBottom: "8px" }}>
          <NavLink to="/reports" style={subLinkStyle}>
            Monthly Report
          </NavLink>
          <NavLink to="/reports" style={subLinkStyle}>
            Category-wise
          </NavLink>
        </div>
      )}

      {/* Settings */}
      <NavLink to="/settings" style={linkStyle}>
        Settings
      </NavLink>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "24px",
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: "#fee2e2",
          color: "#b91c1c",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

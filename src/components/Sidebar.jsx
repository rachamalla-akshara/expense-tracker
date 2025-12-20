import React from "react";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Expense Tracker</h2>

      <ul style={styles.menu}>
        <li>Dashboard</li>
        <li>Expenses</li>
        <li>Income</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2.2",
    cursor: "pointer",
    flex: 1,
  },
  logout: {
    marginTop: "30px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#ef4444",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Sidebar;

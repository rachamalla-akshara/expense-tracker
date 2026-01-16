// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";

// Expense Context
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  // Handle login
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Protected Add Income/Expense Routes */}
          <Route
            path="/add-income"
            element={isLoggedIn ? <AddIncome /> : <Navigate to="/" />}
          />
          <Route
            path="/add-expense"
            element={isLoggedIn ? <AddExpense /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
}

export default App;

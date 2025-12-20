import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// NEW: Expense Context
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  // Function to handle login state update from Login component
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <ExpenseProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )}
          />
        </Routes>
      </BrowserRouter>
    </ExpenseProvider>
  );
}

export default App;

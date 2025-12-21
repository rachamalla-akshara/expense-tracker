// src/components/UserProfile.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

const UserProfile = () => {
  const { user } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  const totalIncome = transactions
    .filter(txn => txn.amount > 0)
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpenses = transactions
    .filter(txn => txn.amount < 0)
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Get initials from user name
  const getInitials = (name) => {
    return name.split(" ").map(n => n[0].toUpperCase()).join("");
  };

  return (
    <div style={{ position: "relative" }}>
      {/* User Icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          backgroundColor: "#4f46e5",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}
      >
        {getInitials(user?.name || "U")}
      </div>

      {/* Dropdown/Profile Details */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "55px",
            right: 0,
            width: "220px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "12px",
            zIndex: 100,
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", fontWeight: 600 }}>{user?.name}</h4>

          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
            <p style={{ margin: "4px 0" }}>Balance: ₹{totalBalance}</p>
            <p style={{ margin: "4px 0" }}>Income: ₹{totalIncome}</p>
            <p style={{ margin: "4px 0" }}>Expenses: ₹{totalExpenses}</p>
          </div>

          <hr style={{ margin: "8px 0", borderColor: "#e5e7eb" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              onClick={() => { navigate("/edit-profile"); setOpen(false); }}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#f3f4f6",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "left"
              }}
            >
              Edit Profile
            </button>
            <button
              onClick={() => { navigate("/add-income"); setOpen(false); }}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#f3f4f6",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "left"
              }}
            >
              Add Income
            </button>
            <button
              onClick={() => { navigate("/add-expense"); setOpen(false); }}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#f3f4f6",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "left"
              }}
            >
              Add Expense
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/");
              }}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#f3f4f6",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "left"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

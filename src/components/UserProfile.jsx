// src/components/UserProfile.jsx
import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(ExpenseContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      {/* Clickable Icon */}
      <div
        onClick={() => setOpen(!open)}
        title="View Profile"
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {user.name[0]}
      </div>

      {/* Profile Panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50px",
            background: "#fff",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            width: "250px",
            padding: "16px",
            zIndex: 10,
          }}
        >
          <h3 style={{ marginBottom: "8px" }}>{user.name}</h3>
          <p>
            <strong>Currency:</strong> {user.currency}
          </p>
          <p>
            <strong>Total Transactions:</strong> {user.transactions.length}
          </p>
          <p>
            <strong>Balance:</strong> ₹
            {user.transactions.reduce((sum, t) => sum + t.amount, 0)}
          </p>
          <button
            onClick={() => navigate("/profile")}
            style={{
              marginTop: "12px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

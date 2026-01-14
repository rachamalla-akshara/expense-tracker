import React, { useState } from "react";

const TransactionForm = ({ type }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>
        {type === "income" ? "Add Income" : "Add Expense"}
      </h2>

      <div
        style={{
          maxWidth: "400px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "16px" }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TransactionForm; 

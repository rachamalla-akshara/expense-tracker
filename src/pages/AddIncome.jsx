// src/pages/AddIncome.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

const AddIncome = () => {
  const { addTransaction } = useContext(ExpenseContext);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return alert("Enter a valid amount!");

    addTransaction({
      amount: parseFloat(amount),
      category,
      date,
    });

    // Reset form
    setAmount("");
    setCategory("Salary");
    setDate(new Date().toISOString().split("T")[0]);

    // Go back to Dashboard
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "8px" }}>
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncome;

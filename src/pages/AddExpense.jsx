// src/pages/AddExpense.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

const AddExpense = () => {
  const { addTransaction } = useContext(ExpenseContext);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return alert("Enter a valid amount!");

    addTransaction({
      amount: -Math.abs(parseFloat(amount)), // always negative
      category,
      date,
    });

    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);

    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
      <h2>Add Expense</h2>
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
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
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
        <button type="submit" style={{ padding: "10px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;


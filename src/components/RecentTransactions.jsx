import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const RecentTransactions = () => {
  const { transactions } = useContext(ExpenseContext);

  return (
    <div style={{
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      maxHeight: "300px",
      overflowY: "auto"
    }}>
      <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "600" }}>Recent Transactions</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontWeight: "500", marginBottom: "10px", color: "#555" }}>
        <span>Date</span>
        <span>Category</span>
        <span>Amount</span>
      </div>

      {transactions.slice(0, 5).map((txn) => (
        <div key={txn.id} style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "8px 0",
          borderBottom: "1px solid #eee",
          alignItems: "center"
        }}>
          <span>{txn.date}</span>
          <span>{txn.category}</span>
          <span style={{ color: txn.amount < 0 ? "red" : "green", fontWeight: "600" }}>
            ₹{txn.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;

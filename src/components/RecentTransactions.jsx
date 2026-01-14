// src/components/RecentTransactions.jsx
import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const RecentTransactions = () => {
  const { user, editTransaction, deleteTransaction } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  const [editingId, setEditingId] = useState(null);
  const [editTxn, setEditTxn] = useState({ category: "", amount: "", date: "" });

  const handleEditClick = (txn) => {
    setEditingId(txn.id);
    setEditTxn({ category: txn.category, amount: txn.amount, date: txn.date });
  };

  const handleSaveEdit = (id) => {
    editTransaction(id, { ...editTxn, amount: Number(editTxn.amount) });
    setEditingId(null);
    setEditTxn({ category: "", amount: "", date: "" });
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div style={{
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      maxHeight: "350px",
      overflowY: "auto"
    }}>
      <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>
        Recent Transactions
      </h3>

      {sortedTransactions.length === 0 ? (
        <p style={{ fontSize: "14px", color: "#6b7280" }}>No transactions yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sortedTransactions.map(txn => (
            <li
              key={txn.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              {editingId === txn.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <input
                    type="text"
                    value={editTxn.category}
                    onChange={(e) => setEditTxn({ ...editTxn, category: e.target.value })}
                    style={{ padding: "4px", fontSize: "14px" }}
                  />
                  <input
                    type="number"
                    value={editTxn.amount}
                    onChange={(e) => setEditTxn({ ...editTxn, amount: e.target.value })}
                    style={{ padding: "4px", fontSize: "14px" }}
                  />
                  <input
                    type="date"
                    value={editTxn.date}
                    onChange={(e) => setEditTxn({ ...editTxn, date: e.target.value })}
                    style={{ padding: "4px", fontSize: "14px" }}
                  />
                </div>
              ) : (
                <div>
                  <p style={{ margin: 0, fontSize: "14px" }}>{txn.category}</p>
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>{txn.date}</span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {editingId === txn.id ? (
                  <button
                    onClick={() => handleSaveEdit(txn.id)}
                    style={{
                      padding: "4px 8px",
                      background: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <span style={{ color: txn.amount < 0 ? "#F44336" : "#4CAF50", fontWeight: 600 }}>
                    {txn.amount < 0 ? `-₹${Math.abs(txn.amount)}` : `₹${txn.amount}`}
                  </span>
                )}

                {editingId === txn.id ? null : (
                  <button
                    onClick={() => handleEditClick(txn)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#6b7280",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    ✎
                  </button>
                )}

                <button
                  onClick={() => deleteTransaction(txn.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#6b7280",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;

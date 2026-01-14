// src/components/Bills.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const Bills = () => {
  const { user, markBillPaid } = useContext(ExpenseContext);

  return (
    <div style={{ padding: 15, background: "#fff", borderRadius: 10, marginBottom: 16 }}>
      <h4>Bills</h4>
      {user.bills.length === 0 ? (
        <p>No bills.</p>
      ) : (
        <ul>
          {user.bills.map(b => (
            <li key={b.id} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{b.name}: {user.currency}{Math.abs(b.amount)}</span>
              <span>Due: {b.dueDate}</span>
              <button disabled={b.paid} onClick={() => markBillPaid(b.id)}>
                {b.paid ? "Paid" : "Mark Paid"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bills; 

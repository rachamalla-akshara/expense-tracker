// src/components/RecurringPayments.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const RecurringPayments = () => {
  const { user, deleteRecurringPayment } = useContext(ExpenseContext);

  return (
    <div style={{ padding: 15, background: "#fff", borderRadius: 10, marginBottom: 16 }}>
      <h4>Recurring Payments</h4>
      {user.recurringPayments.length === 0 ? (
        <p>No recurring payments.</p>
      ) : (
        <ul>
          {user.recurringPayments.map(rp => (
            <li key={rp.id} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{rp.category}: {user.currency}{Math.abs(rp.amount)}</span>
              <span>Next: {rp.nextDue}</span>
              <button onClick={() => deleteRecurringPayment(rp.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecurringPayments; 

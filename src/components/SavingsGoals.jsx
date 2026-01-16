// src/components/SavingsGoals.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const SavingsGoals = () => {
  const { user } = useContext(ExpenseContext);

  return (
    <div style={{ padding: 15, background: "#fff", borderRadius: 10, marginBottom: 16 }}>
      <h4>Savings Goals</h4>
      {user.savingsGoals.length === 0 ? (
        <p>No savings goals.</p>
      ) : (
        <ul>
          {user.savingsGoals.map(g => {
            const percent = Math.min((g.saved / g.target) * 100, 100);
            return (
              <li key={g.id} style={{ marginBottom: 10 }}>
                <div>{g.name}: {user.currency}{g.saved} / {user.currency}{g.target}</div>
                <div style={{ background: "#e5e7eb", borderRadius: 5, height: 8, width: "100%" }}>
                  <div style={{ width: `${percent}%`, background: "#4CAF50", height: "100%", borderRadius: 5 }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SavingsGoals;

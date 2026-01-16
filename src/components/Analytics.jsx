// src/components/Analytics.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const Analytics = () => {
  const { user } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const topCategory = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  const maxCategory = Object.entries(topCategory).sort((a,b)=>b[1]-a[1])[0]?.[0] || "N/A";

  return (
    <div style={{ padding: 15, background: "#fff", borderRadius: 10, marginBottom: 16 }}>
      <h4>Insights</h4>
      <p>Total Income: {user.currency}{totalIncome}</p>
      <p>Total Expenses: {user.currency}{totalExpenses}</p>
      <p>Highest Spending Category: {maxCategory}</p>
    </div>
  );
};

export default Analytics;

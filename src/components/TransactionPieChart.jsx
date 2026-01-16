// src/components/TransactionPieChart.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionPieChart = () => {
  const { user } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  // Split income vs expenses
  const income = transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0);
  const expenses = transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverOffset: 6
      }
    ],
  };

  return (
    <div style={{
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      height: "250px"
    }}>
      <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>Income vs Expenses</h3>
      <Pie data={data} />
    </div>
  );
};

export default TransactionPieChart;

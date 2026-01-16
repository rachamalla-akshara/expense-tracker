// src/components/CategoryExpenseChart.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryExpenseChart = () => {
  const { user } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  // Group expenses by category
  const categoryMap = {};
  transactions.forEach(txn => {
    if (txn.amount < 0) {
      categoryMap[txn.category] = (categoryMap[txn.category] || 0) + Math.abs(txn.amount);
    }
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ],
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
      <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>Expenses by Category</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default CategoryExpenseChart;

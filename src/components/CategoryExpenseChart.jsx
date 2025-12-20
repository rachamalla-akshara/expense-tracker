import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryExpenseChart = () => {
  const { transactions } = useContext(ExpenseContext);

  const categoryTotals = {};
  transactions.forEach(txn => {
    if(txn.amount < 0) {
      categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { font: { size: 12 } } },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      height: "250px"
    }}>
      <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>Category-wise Spending</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryExpenseChart;

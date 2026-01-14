// src/components/MonthlyExpenseChart.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyExpenseChart = ({ dateRange }) => {
  const { user } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyExpenses = Array(12).fill(0);

  transactions.forEach(txn => {
    const date = new Date(txn.date);
    const month = date.getMonth();
    if (txn.amount < 0) monthlyExpenses[month] += Math.abs(txn.amount);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyExpenses,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { font: { size: 12 } } },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { font: { size: 12 } } },
      x: { ticks: { font: { size: 12 } } }
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
      <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>Monthly Expenses</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyExpenseChart;

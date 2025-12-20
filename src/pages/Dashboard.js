import React, { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import UpcomingBills from "../components/UpcomingBills";
import SavingsGoalCard from "../components/SavingsGoalCard";
import RecentTransactions from "../components/RecentTransactions";

// Lazy load charts
const MonthlyExpenseChart = React.lazy(() => import("../components/MonthlyExpenseChart"));
const CategoryExpenseChart = React.lazy(() => import("../components/CategoryExpenseChart"));

const Dashboard = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>Dashboard</h1>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
          <Card title="Total Balance" value="₹25,000" />
          <Card title="Total Income" value="₹40,000" />
          <Card title="Total Expenses" value="₹15,000" />
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
          <UpcomingBills />
          <SavingsGoalCard />
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
          <div style={{ flex: "1 1 300px" }}>
            <RecentTransactions />
          </div>

          <div style={{ flex: "2 1 600px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Suspense fallback={<div>Loading Monthly Chart...</div>}>
              <MonthlyExpenseChart />
            </Suspense>
            <Suspense fallback={<div>Loading Category Chart...</div>}>
              <CategoryExpenseChart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// src/pages/Dashboard.js
import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import CategoryExpenseChart from "../components/CategoryExpenseChart";
import TransactionPieChart from "../components/TransactionPieChart";
import RecentTransactions from "../components/RecentTransactions";
import UpcomingBills from "../components/UpcomingBills";
import SavingsGoalCard from "../components/SavingsGoalCard";
import UserProfile from "../components/UserProfile";
import RecurringPayments from "../components/RecurringPayments";
import Bills from "../components/Bills";
import SavingsGoals from "../components/SavingsGoals";
import CurrencySelector from "../components/CurrencySelector";
import Analytics from "../components/Analytics";
import { ExpenseContext } from "../context/ExpenseContext";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30");
  const { user } = useContext(ExpenseContext);
  const transactions = user?.transactions || [];

  const totalIncome = transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0);
  const totalExpenses = transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f5f7" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px" }}>
        
        {/* Top Bar: Dashboard title + Date Selector + UserProfile */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600 }}>Dashboard</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #d1d5db", background: "#fff" }}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 3 Months</option>
              <option value="180">Last 6 Months</option>
              <option value="all">All Time</option>
            </select>
            <UserProfile />
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <Card title="Total Balance" value={`₹${totalBalance}`} />
          <Card title="Total Income" value={`₹${totalIncome}`} />
          <Card title="Total Expenses" value={`₹${totalExpenses}`} />
        </div>

        {/* Charts Section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <MonthlyExpenseChart dateRange={dateRange} />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <CategoryExpenseChart dateRange={dateRange} />
            <TransactionPieChart />
          </div>
        </div>

        {/* Extra Features Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <CurrencySelector />
          <RecurringPayments />
          <Bills />
          <SavingsGoals />
          <Analytics />
        </div>

        {/* Bottom Section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
          <RecentTransactions dateRange={dateRange} />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <UpcomingBills />
            <SavingsGoalCard />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

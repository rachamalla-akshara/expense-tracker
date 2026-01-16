// src/context/ExpenseContext.jsx
import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    currency: "INR",
    transactions: [
      { id: 1, date: "2025-12-19", category: "Food", amount: -20, note: "", recurring: false },
      { id: 2, date: "2025-12-18", category: "Salary", amount: 500, note: "", recurring: false },
      { id: 3, date: "2025-12-18", category: "Transport", amount: -15, note: "", recurring: false },
    ],
    recurringPayments: [
      { id: 1, category: "Netflix", amount: -500, frequency: "Monthly", nextDue: "2025-12-25" }
    ],
    bills: [
      { id: 1, name: "Electricity Bill", amount: -1200, dueDate: "2025-12-23", paid: false },
      { id: 2, name: "Internet Bill", amount: -800, dueDate: "2025-12-20", paid: false }
    ],
    savingsGoals: [
      { id: 1, name: "Trip to Goa", target: 50000, saved: 15000 }
    ],
  });

  // ---------------- TRANSACTIONS ----------------
  const addTransaction = (txn) => {
    setUser(prev => ({
      ...prev,
      transactions: [...prev.transactions, { id: Date.now(), ...txn }],
    }));
  };

  const addIncome = (data) => {
    addTransaction({ ...data, amount: Math.abs(data.amount) });
  };

  const addExpense = (data) => {
    addTransaction({ ...data, amount: -Math.abs(data.amount) });
  };

  // ✅ NEW: Update transaction
  const editTransaction = (id, updatedTxn) => {
    setUser(prev => ({
      ...prev,
      transactions: prev.transactions.map(txn =>
        txn.id === id ? { ...txn, ...updatedTxn } : txn
      )
    }));
  };

  // ✅ NEW: Delete transaction
  const deleteTransaction = (id) => {
    setUser(prev => ({
      ...prev,
      transactions: prev.transactions.filter(txn => txn.id !== id),
    }));
  };

  // ---------------- DASHBOARD CALCULATIONS ----------------
  const totalIncome = user.transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = user.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // ---------------- BILLS ----------------
  const markBillPaid = (id) => {
    setUser(prev => ({
      ...prev,
      bills: prev.bills.map(b =>
        b.id === id ? { ...b, paid: true } : b
      )
    }));
  };

  // ---------------- RECURRING ----------------
  const addRecurringPayment = (payment) => {
    setUser(prev => ({
      ...prev,
      recurringPayments: [...prev.recurringPayments, { id: Date.now(), ...payment }]
    }));
  };

  const deleteRecurringPayment = (id) => {
    setUser(prev => ({
      ...prev,
      recurringPayments: prev.recurringPayments.filter(rp => rp.id !== id)
    }));
  };

  // ---------------- SAVINGS ----------------
  const addSavingsGoal = (goal) => {
    setUser(prev => ({
      ...prev,
      savingsGoals: [...prev.savingsGoals, { id: Date.now(), ...goal }]
    }));
  };

  const updateSavingsGoal = (id, updatedGoal) => {
    setUser(prev => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map(g =>
        g.id === id ? { ...g, ...updatedGoal } : g
      )
    }));
  };

  // ---------------- CURRENCY ----------------
  const setCurrency = (currency) => {
    setUser(prev => ({ ...prev, currency }));
  };

  return (
    <ExpenseContext.Provider
      value={{
        user,
        setUser,
        addTransaction,
        addIncome,
        addExpense,
        editTransaction,    // ✅ added
        deleteTransaction,  // ✅ added
        markBillPaid,
        addRecurringPayment,
        deleteRecurringPayment,
        addSavingsGoal,
        updateSavingsGoal,
        setCurrency,
        totalIncome,
        totalExpense,
        balance
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

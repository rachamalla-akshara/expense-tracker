// src/context/ExpenseContext.jsx
import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    currency: "INR", // default currency
    transactions: [
      { id: 1, date: "2025-12-19", category: "Food", amount: -20, note: "", recurring: false },
      { id: 2, date: "2025-12-18", category: "Salary", amount: 500, note: "", recurring: false },
      { id: 3, date: "2025-12-18", category: "Transport", amount: -15, note: "", recurring: false },
    ],
    recurringPayments: [
      // Example recurring payment
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

  // Transactions
  const addTransaction = (txn) => {
    setUser({
      ...user,
      transactions: [...user.transactions, { id: Date.now(), ...txn }],
    });
  };

  const deleteTransaction = (id) => {
    setUser({
      ...user,
      transactions: user.transactions.filter(txn => txn.id !== id),
    });
  };

  const editTransaction = (id, updatedTxn) => {
    setUser({
      ...user,
      transactions: user.transactions.map(txn => txn.id === id ? { ...txn, ...updatedTxn } : txn)
    });
  };

  // Bills
  const markBillPaid = (id) => {
    setUser({
      ...user,
      bills: user.bills.map(b => b.id === id ? { ...b, paid: true } : b)
    });
  };

  // Recurring Payments
  const addRecurringPayment = (payment) => {
    setUser({
      ...user,
      recurringPayments: [...user.recurringPayments, { id: Date.now(), ...payment }]
    });
  };

  const deleteRecurringPayment = (id) => {
    setUser({
      ...user,
      recurringPayments: user.recurringPayments.filter(rp => rp.id !== id)
    });
  };

  // Savings Goals
  const addSavingsGoal = (goal) => {
    setUser({
      ...user,
      savingsGoals: [...user.savingsGoals, { id: Date.now(), ...goal }]
    });
  };

  const updateSavingsGoal = (id, updatedGoal) => {
    setUser({
      ...user,
      savingsGoals: user.savingsGoals.map(g => g.id === id ? { ...g, ...updatedGoal } : g)
    });
  };

  // Currency
  const setCurrency = (currency) => {
    setUser({ ...user, currency });
  };

  return (
    <ExpenseContext.Provider
      value={{
        user,
        setUser,
        addTransaction,
        deleteTransaction,
        editTransaction,
        markBillPaid,
        addRecurringPayment,
        deleteRecurringPayment,
        addSavingsGoal,
        updateSavingsGoal,
        setCurrency
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

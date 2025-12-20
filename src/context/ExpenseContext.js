import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-12-19", category: "Food", amount: -20 },
    { id: 2, date: "2025-12-18", category: "Salary", amount: 500 },
    { id: 3, date: "2025-12-18", category: "Transport", amount: -15 },
    { id: 4, date: "2025-12-17", category: "Shopping", amount: -50 },
    { id: 5, date: "2025-12-16", category: "Entertainment", amount: -30 },
    { id: 6, date: "2025-12-15", category: "Food", amount: -10 },
  ]);

  return (
    <ExpenseContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </ExpenseContext.Provider>
  );
};

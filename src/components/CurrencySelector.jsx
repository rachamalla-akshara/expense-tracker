// src/components/CurrencySelector.jsx
import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const CurrencySelector = () => {
  const { user, setCurrency } = useContext(ExpenseContext);

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ marginRight: 8 }}>Currency:</label>
      <select value={user.currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
        <option value="GBP">£ GBP</option>
      </select>
    </div>
  );
};

export default CurrencySelector;

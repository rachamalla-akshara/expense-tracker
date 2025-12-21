import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { transactions, deleteTransaction, editTransaction } = useContext(ExpenseContext);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ description: "", amount: "", category: "" });

  const startEdit = (txn) => {
    setEditingId(txn.id);
    setEditData({ description: txn.description, amount: txn.amount, category: txn.category });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    editTransaction(editingId, editData);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <Link to="/dashboard" className="text-blue-500 underline mb-4 inline-block">← Back to Dashboard</Link>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-b">
              {editingId === txn.id ? (
                <>
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="amount"
                      value={editData.amount}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="category"
                      value={editData.category}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="p-2 space-x-2">
                    <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">{txn.description}</td>
                  <td className={`p-2 ${txn.amount < 0 ? "text-red-500" : "text-green-500"}`}>₹{txn.amount}</td>
                  <td className="p-2">{txn.category}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => startEdit(txn)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => deleteTransaction(txn.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

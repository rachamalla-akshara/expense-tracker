import React from "react";

const SavingsGoalCard = () => {
  const goalAmount = 100000;
  const savedAmount = 42000;

  const progress = (savedAmount / goalAmount) * 100;

  return (
    <div style={styles.container}>
      <h3>Savings Goal</h3>

      <p style={styles.amount}>
        ₹{savedAmount.toLocaleString()} / ₹{goalAmount.toLocaleString()}
      </p>

      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${progress}%`,
          }}
        />
      </div>

      <p style={styles.percent}>{Math.round(progress)}% completed</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginTop: "30px",
    maxWidth: "450px",
  },
  amount: {
    margin: "10px 0",
    fontWeight: "500",
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#10b981",
  },
  percent: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#374151",
  },
};

export default SavingsGoalCard;

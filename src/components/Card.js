import React from "react";

const Card = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    minWidth: "200px",
  },
  title: {
    color: "#6b7280",
    marginBottom: "8px",
  },
  value: {
    color: "#111827",
    margin: 0,
  },
};

export default Card;

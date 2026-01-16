import React from "react";

const UpcomingBills = () => {
  const bills = [
    { name: "Electricity Bill", amount: "₹1,500", date: "25 Dec" },
    { name: "Internet Bill", amount: "₹999", date: "28 Dec" },
    { name: "Rent", amount: "₹12,000", date: "1 Jan" },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Upcoming Bills</h3>

      {bills.map((bill, index) => (
        <div key={index} style={styles.bill}>
          <div>
            <p style={styles.name}>{bill.name}</p>
            <p style={styles.date}>{bill.date}</p>
          </div>
          <p style={styles.amount}>{bill.amount}</p>
        </div>
      ))}
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
  heading: {
    marginBottom: "15px",
  },
  bill: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  name: {
    margin: 0,
    fontWeight: "500",
  },
  date: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
  },
  amount: {
    fontWeight: "600",
  },
};

export default UpcomingBills;

# 💰 Expense Tracker

A full‑stack **Expense Tracker** application to manage your daily income and expenses with user authentication, category‑wise tracking, and visual dashboards.

---

## 🚀 Features

* 🔐 User Authentication (Login / Logout)
* ➕ Add Income & Expense Transactions
* 🗂️ Category‑based expense tracking
* 📊 Dashboard with charts & summaries
* 🕒 Track *who* made changes and *when* (audit‑friendly)
* 📅 Monthly & recent transaction views
* 💾 Persistent storage using database

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Context API
* Chart libraries (Pie / Bar / Monthly charts)
* HTML, CSS, JavaScript

### Backend

* Node.js
* Express.js
* SQLite (can be extended to MySQL/PostgreSQL)

---

## 📂 Project Structure

```
expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 📊 Dashboard Overview

* **Total Balance**
* **Total Income vs Expense**
* **Category‑wise Expense Chart**
* **Recent Transactions**
* **Monthly Expense Summary**

---

## 🔐 Authentication Flow

1. User logs in
2. Session is created
3. All transactions are linked to the logged‑in user
4. Each change is timestamped

---

## 🧠 Learning Outcomes

* Full‑stack CRUD operations
* React state management with Context API
* Backend API integration
* SQL queries (JOIN, GROUP BY)
* Real‑world project structure

---

## 🔮 Future Enhancements

* 📈 Advanced analytics & reports
* 📤 Export to PDF / Excel
* 📧 Email notifications
* 🌐 Cloud database integration
* 📱 Mobile‑responsive UI

---
*****To Start FrontEnd must be using (cmd)****
cd "C:\Users\raksh\OneDrive\Desktop\expense-tracker-main\frontend"
npm install
set PORT=4001
npm start
To Start BackEnd must be using
cd "C:\Users\raksh\OneDrive\Desktop\expense-tracker-main\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py

*****To login use*****
achu@gmail.com-Email
12345-Password
ngrok link - (https://b364-152-59-201-38.ngrok-free.app/login)

****DB browser use for checking data****
browse the database 

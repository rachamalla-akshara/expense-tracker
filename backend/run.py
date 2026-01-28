from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS   # ✅ ADD THIS
import os

app = Flask(__name__)
CORS(app)   # ✅ ADD THIS

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, "expenses.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/transactions/", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([
        {"id": t.id, "amount": t.amount, "category": t.category, "date": t.date}
        for t in transactions
    ])

@app.route("/transactions/", methods=["POST"])
def add_transaction():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    new_transaction = Transaction(
        amount=data["amount"],
        category=data["category"],
        date=data["date"]
    )
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Transaction added"}), 201

# ==============================
# NEW: summary endpoint
# ==============================
@app.route("/summary/", methods=["GET"])
def get_summary():
    transactions = Transaction.query.all()
    
    total_income = sum(t.amount for t in transactions if t.amount > 0)
    total_expense = sum(-t.amount for t in transactions if t.amount < 0)
    
    return jsonify({
        "total_income": total_income,
        "total_expense": total_expense
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)

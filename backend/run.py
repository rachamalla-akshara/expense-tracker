from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import text
import os

app = Flask(__name__)
CORS(app)

# ================================
# Database Setup
# ================================
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, "expenses.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "connect_args": {
        "check_same_thread": False,  # allows Flask to use the DB in multiple threads
        "timeout": 30                # waits 30 seconds if DB is locked
    }
}

db = SQLAlchemy(app)

# ================================
# Database Model
# ================================
class Transaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)

# ================================
# Initialize DB and WAL mode
# ================================
with app.app_context():
    db.create_all()
    db.session.execute(text("PRAGMA journal_mode=WAL;"))
    db.session.commit()

# ================================
# Routes
# ================================
@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([
        {"id": t.id, "amount": t.amount, "category": t.category, "date": t.date}
        for t in transactions
    ])

@app.route("/transactions", methods=["POST"])
def add_transaction():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No JSON received"}), 400

        # Validate required fields
        for key in ["amount", "category", "date"]:
            if key not in data:
                return jsonify({"error": f"Missing field: {key}"}), 400

        txn = Transaction(
            amount=float(data["amount"]),
            category=data["category"],
            date=data["date"]
        )

        db.session.add(txn)
        db.session.commit()

        return jsonify({
            "message": "Transaction added",
            "transaction": {
                "id": txn.id,
                "amount": txn.amount,
                "category": txn.category,
                "date": txn.date
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/summary", methods=["GET"])
def get_summary():
    transactions = Transaction.query.all()
    total_income = sum(t.amount for t in transactions if t.amount > 0)
    total_expense = sum(-t.amount for t in transactions if t.amount < 0)
    return jsonify({
        "total_income": total_income,
        "total_expense": total_expense
    })

# ================================
# Properly remove session after each request
# ================================
@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()

# ================================
# Run App
# ================================
if __name__ == "__main__":
    app.run(port=5001, debug=False, use_reloader=False)

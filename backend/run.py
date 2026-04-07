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
        "check_same_thread": False,
        "timeout": 30
    }
}

db = SQLAlchemy(app)

# ================================
# Database Models
# ================================
class Transaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class UserSession(db.Model):
    __tablename__ = "user_sessions"
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(100), nullable=False)
    event_type = db.Column(db.String(10), nullable=False)  # login/logout
    timestamp = db.Column(db.DateTime, server_default=db.func.current_timestamp())

def record_session(user_email, event_type):
    session = UserSession(user_email=user_email, event_type=event_type)
    db.session.add(session)
    db.session.commit()

# ================================
# Initialize DB + WAL mode
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

# --- Transactions ---
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

# --- Login/Logout ---
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    record_session(email, "login")
    return jsonify({"message": "Login successful"})

@app.route("/logout", methods=["POST"])
def logout():
    data = request.get_json(force=True)
    email = data.get("email")

    record_session(email, "logout")
    return jsonify({"message": "Logout successful"})

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
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

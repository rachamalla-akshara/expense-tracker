from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

# Make sure the DB path is absolute
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "expenses.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Transaction model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=False)

# Create DB tables and pre-populate if empty
with app.app_context():
    db.create_all()
    
    # Pre-populate DB with sample transactions (only if empty)
    if Transaction.query.count() == 0:
        sample_transactions = [
            Transaction(amount=200.0, description="Groceries"),
            Transaction(amount=150.0, description="Transport"),
            Transaction(amount=300.0, description="Rent")
        ]
        db.session.bulk_save_objects(sample_transactions)
        db.session.commit()
        print("Sample transactions added to DB ✅")

# GET all transactions
@app.route("/transactions/", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    result = [
        {"id": t.id, "amount": t.amount, "description": t.description} 
        for t in transactions
    ]
    return jsonify(result)

# GET a single transaction by ID
@app.route("/transactions/<int:transaction_id>/", methods=["GET"])
def get_transaction_by_id(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        return jsonify({
            "id": transaction.id,
            "amount": transaction.amount,
            "description": transaction.description
        })
    else:
        return jsonify({"error": "Transaction not found"}), 404

# POST a new transaction
@app.route("/transactions/", methods=["POST"])
def add_transaction():
    try:
        data = request.get_json()
        amount = data.get("amount")
        description = data.get("description")

        if amount is None or description is None:
            return jsonify({"error": "Amount and description required"}), 400

        new_transaction = Transaction(amount=amount, description=description)
        db.session.add(new_transaction)
        db.session.commit()

        return jsonify({
            "id": new_transaction.id,
            "amount": new_transaction.amount,
            "description": new_transaction.description
        }), 201

    except Exception as e:
        # Return detailed error so you can debug
        return jsonify({"error": str(e)}), 500

# ======================
# NEW ENDPOINTS ADDED
# ======================

# PUT: Update a transaction by ID
@app.route("/transactions/<int:transaction_id>/", methods=["PUT"])
def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404

    data = request.get_json()
    amount = data.get("amount")
    description = data.get("description")

    if amount is not None:
        transaction.amount = amount
    if description is not None:
        transaction.description = description

    db.session.commit()
    return jsonify({
        "id": transaction.id,
        "amount": transaction.amount,
        "description": transaction.description
    })

# DELETE: Remove a transaction by ID
@app.route("/transactions/<int:transaction_id>/", methods=["DELETE"])
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404

    db.session.delete(transaction)
    db.session.commit()
    return jsonify({"message": f"Transaction {transaction_id} deleted successfully"})

# ======================

if __name__ == "__main__":
    app.run(port=5001, debug=True)

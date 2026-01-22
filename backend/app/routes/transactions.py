from flask import Blueprint, request, jsonify
from app import db
from app.models.transaction import Transaction

transactions_bp = Blueprint("transactions_bp", __name__, url_prefix="/transactions")

# GET all transactions
@transactions_bp.route("/", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    result = []
    for t in transactions:
        result.append({
            "id": t.id,
            "amount": t.amount,
            "category": t.category,
            "description": t.description,
            "created_at": t.created_at
        })
    return jsonify(result)

# POST a new transaction
@transactions_bp.route("/", methods=["POST"])
def add_transaction():
    data = request.get_json()
    amount = data.get("amount")
    category = data.get("category")
    description = data.get("description", "")

    if amount is None or category is None:
        return jsonify({"error": "amount and category are required"}), 400

    transaction = Transaction(amount=amount, category=category, description=description)
    db.session.add(transaction)
    db.session.commit()

    return jsonify({"message": "Transaction added successfully", "id": transaction.id}), 201

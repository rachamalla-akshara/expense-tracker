from flask import Blueprint, request, jsonify
from app.models import Transaction

transactions_bp = Blueprint("transactions_bp", __name__)

@transactions_bp.route("/transactions/search", methods=["GET"])
def search_transactions():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    category = request.args.get("category")
    min_amount = request.args.get("min_amount", type=float)
    max_amount = request.args.get("max_amount", type=float)

    query = Transaction.query

    if start_date:
        query = query.filter(Transaction.date >= start_date)
    if end_date:
        query = query.filter(Transaction.date <= end_date)
    if category:
        query = query.filter(Transaction.category.ilike(f"%{category}%"))
    if min_amount is not None:
        query = query.filter(Transaction.amount >= min_amount)
    if max_amount is not None:
        query = query.filter(Transaction.amount <= max_amount)

    results = query.all()
    transactions_list = [t.to_dict() for t in results]

    return jsonify({"transactions": transactions_list})

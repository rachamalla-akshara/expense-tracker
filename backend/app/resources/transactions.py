from flask import Blueprint, request, jsonify
from app.models import Transaction
from app import create_app, db
from datetime import date

transactions_bp = Blueprint("transactions_bp", __name__)

@transactions_bp.route("/transactions/search", methods=["GET"])
def search_transactions():
    start_date = request.args.get("start_date")  # YYYY-MM-DD
    end_date = request.args.get("end_date")      # YYYY-MM-DD
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


# ===============================
# ✅ Dummy transactions for testing
# ===============================
if __name__ == "__main__":
    app = create_app()
    app.app_context().push()

    # Optional: Clear old transactions
    Transaction.query.delete()
    db.session.commit()

    # Add dummy transactions
    t1 = Transaction(user_id=1, amount=50.0, category="Food", date=date(2026, 1, 15))
    t2 = Transaction(user_id=1, amount=120.0, category="Utilities", date=date(2026, 1, 18))
    t3 = Transaction(user_id=2, amount=75.5, category="Entertainment", date=date(2026, 1, 20))
    t4 = Transaction(user_id=1, amount=200.0, category="Shopping", date=date(2026, 1, 22))

    db.session.add_all([t1, t2, t3, t4])
    db.session.commit()

    print("✅ Dummy transactions added successfully!")

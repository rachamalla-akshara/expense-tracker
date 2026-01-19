from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Transaction

class AnalyticsResource(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        transactions = Transaction.query.filter_by(user_id=user).all()
        total_income = sum(t.amount for t in transactions if t.amount > 0)
        total_expense = sum(-t.amount for t in transactions if t.amount < 0)
        balance = total_income - total_expense
        return {
            "total_income": total_income,
            "total_expense": total_expense,
            "balance": balance,
            "transaction_count": len(transactions)
        }, 200

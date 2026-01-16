from flask_restful import Resource
from ..models import Transaction
from sqlalchemy import func

class AnalyticsResource(Resource):
    def get(self):
        total_income = db.session.query(func.sum(Transaction.amount)).filter(Transaction.amount > 0).scalar() or 0
        total_expense = abs(db.session.query(func.sum(Transaction.amount)).filter(Transaction.amount < 0).scalar() or 0)
        balance = total_income - total_expense
        return {
            "total_income": total_income,
            "total_expense": total_expense,
            "balance": balance
        }, 200

from flask_restful import Resource, reqparse
from app import db
from app.models import Transaction

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True)
parser.add_argument('amount', type=float, required=True)
parser.add_argument('category', type=str, required=True)

class TransactionList(Resource):
    def get(self):
        transactions = Transaction.query.all()
        return [{"id": t.id, "title": t.title, "amount": t.amount, "category": t.category} for t in transactions], 200

    def post(self):
        data = parser.parse_args()
        t = Transaction(title=data['title'], amount=data['amount'], category=data['category'])
        db.session.add(t)
        db.session.commit()
        return {"message": "Transaction added", "id": t.id}, 201

class TransactionResource(Resource):
    def put(self, id):
        data = parser.parse_args()
        t = Transaction.query.get_or_404(id)
        t.title = data['title']
        t.amount = data['amount']
        t.category = data['category']
        db.session.commit()
        return {"message": "Transaction updated"}, 200

    def delete(self, id):
        t = Transaction.query.get_or_404(id)
        db.session.delete(t)
        db.session.commit()
        return {"message": "Transaction deleted"}, 200

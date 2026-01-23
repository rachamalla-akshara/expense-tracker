from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

transactions_bp = Blueprint('transactions', __name__, url_prefix='/transactions')

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=False)

@transactions_bp.route('/', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    result = [{'id': t.id, 'amount': t.amount, 'description': t.description} for t in transactions]
    return jsonify(result)

@transactions_bp.route('/', methods=['POST'])
def add_transaction():
    data = request.get_json()
    new_t = Transaction(amount=data['amount'], description=data['description'])
    db.session.add(new_t)
    db.session.commit()
    return jsonify({'message': 'Transaction added!', 'id': new_t.id}), 201

from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from .models import db, Transaction, RecurringPayment, Bill, SavingsGoal, Notification

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///expense.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    api = Api(app)

    # Sample route
    @app.route("/")
    def home():
        return jsonify({"message": "Expense Tracker Backend Running!"})

    # Resource APIs
    class TransactionResource(Resource):
        def get(self):
            transactions = Transaction.query.all()
            return [{"id": t.id, "title": t.title, "amount": t.amount, "category": t.category, "date": t.date.isoformat()} for t in transactions]
    
    class RecurringResource(Resource):
        def get(self):
            payments = RecurringPayment.query.all()
            return [{"id": p.id, "title": p.title, "amount": p.amount, "frequency": p.frequency, "next_date": p.next_date.isoformat()} for p in payments]
    
    class BillResource(Resource):
        def get(self):
            bills = Bill.query.all()
            return [{"id": b.id, "title": b.title, "amount": b.amount, "due_date": b.due_date.isoformat(), "paid": b.paid} for b in bills]
    
    class SavingsResource(Resource):
        def get(self):
            goals = SavingsGoal.query.all()
            return [{"id": g.id, "title": g.title, "target_amount": g.target_amount, "current_amount": g.current_amount} for g in goals]
    
    class NotificationResource(Resource):
        def get(self):
            notes = Notification.query.all()
            return [{"id": n.id, "message": n.message, "created_at": n.created_at.isoformat(), "read": n.read} for n in notes]

    # Add routes
    api.add_resource(TransactionResource, "/transactions")
    api.add_resource(RecurringResource, "/recurring")
    api.add_resource(BillResource, "/bills")
    api.add_resource(SavingsResource, "/savings")
    api.add_resource(NotificationResource, "/notifications")

    return app

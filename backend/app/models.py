from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    date = db.Column(db.DateTime, default=datetime.utcnow)

class RecurringPayment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    frequency = db.Column(db.String(20), default="monthly")
    next_date = db.Column(db.DateTime, default=datetime.utcnow)

class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    paid = db.Column(db.Boolean, default=False)

class SavingsGoal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    read = db.Column(db.Boolean, default=False)

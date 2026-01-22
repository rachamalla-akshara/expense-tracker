from app import db

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

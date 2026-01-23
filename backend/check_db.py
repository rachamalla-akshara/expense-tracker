from app.routes.transactions import db, Transaction
from flask import Flask

# Setup app to access the DB
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///transactions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Query all transactions
with app.app_context():
    for t in Transaction.query.all():
        print(t.id, t.amount, t.description)

from flask import Flask
from app.routes.transactions import transactions_bp, db, Transaction

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///transactions.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Create tables
    with app.app_context():
        db.create_all()

    # Register blueprint
    app.register_blueprint(transactions_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5001)

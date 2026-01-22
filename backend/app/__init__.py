from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///expenses.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Register root route
    from app.routes import root_bp
    app.register_blueprint(root_bp)

    # Register transactions route
    from app.routes.transactions import transactions_bp
    app.register_blueprint(transactions_bp)

    return app

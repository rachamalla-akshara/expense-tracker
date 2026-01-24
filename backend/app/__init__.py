from flask import Flask          # ⚡ Must import Flask
from .models.transaction import db
from .routes.transactions import transactions_bp
import os

def create_app():
    app = Flask(__name__)       # ✅ Flask now defined

    # Absolute path to ensure the DB is created in backend folder
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "expenses.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Create DB and tables
    with app.app_context():
        db.create_all()

    # Register blueprint
    app.register_blueprint(transactions_bp, url_prefix="/transactions")

    # Root route to check backend
    @app.route("/")
    def home():
        return "Backend is running!"

    return app

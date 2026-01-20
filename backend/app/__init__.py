from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
import os

db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('config.Config')

    # Initialize extensions
    db.init_app(app)
    JWTManager(app)
    mail.init_app(app)

    # Flask-Mail config
    app.config.update(
        MAIL_SERVER="smtp.gmail.com",
        MAIL_PORT=587,
        MAIL_USE_TLS=True,
        MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
        MAIL_PASSWORD=os.getenv("MAIL_PASSWORD")
    )

    # Import and register blueprints
    from app.routes.transactions import transactions_bp
    app.register_blueprint(transactions_bp)

    from app.resources.notifications import notifications_bp
    app.register_blueprint(notifications_bp)

    return app

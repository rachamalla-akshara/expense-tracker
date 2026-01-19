from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
api = Api()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('config.Config')

    db.init_app(app)
    api.init_app(app)
    JWTManager(app)

    # Import resources
    from app.resources.recurring import RecurringResource
    from app.resources.bills import BillsResource
    from app.resources.savings import SavingsResource
    from app.resources.analytics import AnalyticsResource
    from app.resources.notifications import NotificationsResource

    # Add routes
    api.add_resource(RecurringResource, '/recurring')
    api.add_resource(BillsResource, '/bills')
    api.add_resource(SavingsResource, '/savings')
    api.add_resource(AnalyticsResource, '/analytics')
    api.add_resource(NotificationsResource, '/notifications')

    return app

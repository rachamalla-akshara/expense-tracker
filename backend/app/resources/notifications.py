from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Notification

class NotificationsResource(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        notifications = Notification.query.filter_by(user_id=user).all()
        return [n.to_dict() for n in notifications], 200

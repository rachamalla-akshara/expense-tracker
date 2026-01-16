from flask_restful import Resource, reqparse
from ..models import Notification
from .. import db

parser = reqparse.RequestParser()
parser.add_argument("message", type=str, required=True)
parser.add_argument("read", type=bool, default=False)

class NotificationsResource(Resource):
    def get(self):
        notifications = Notification.query.all()
        return [n.to_dict() for n in notifications], 200

    def post(self):
        data = parser.parse_args()
        notif = Notification(**data)
        db.session.add(notif)
        db.session.commit()
        return notif.to_dict(), 201

class NotificationDetailResource(Resource):
    def put(self, id):
        notif = Notification.query.get_or_404(id)
        notif.read = True
        db.session.commit()
        return notif.to_dict(), 200

    def delete(self, id):
        notif = Notification.query.get_or_404(id)
        db.session.delete(notif)
        db.session.commit()
        return {"message": "Deleted successfully"}, 200

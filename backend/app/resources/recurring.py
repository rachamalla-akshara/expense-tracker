from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import RecurringPayment

parser = reqparse.RequestParser()
parser.add_argument('title', required=True, help="Title cannot be blank")
parser.add_argument('amount', type=float, required=True, help="Amount is required")
parser.add_argument('frequency', required=True, help="Frequency cannot be blank")

class RecurringResource(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        payments = RecurringPayment.query.filter_by(user_id=user).all()
        return [p.to_dict() for p in payments], 200

    @jwt_required()
    def post(self):
        args = parser.parse_args()
        user = get_jwt_identity()
        new_payment = RecurringPayment(
            user_id=user,
            title=args['title'],
            amount=args['amount'],
            frequency=args['frequency']
        )
        db.session.add(new_payment)
        db.session.commit()
        return new_payment.to_dict(), 201

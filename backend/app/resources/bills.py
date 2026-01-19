from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Bill

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)
parser.add_argument('amount', type=float, required=True)
parser.add_argument('due_date', required=True)

class BillsResource(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        bills = Bill.query.filter_by(user_id=user).all()
        return [b.to_dict() for b in bills], 200

    @jwt_required()
    def post(self):
        args = parser.parse_args()
        user = get_jwt_identity()
        new_bill = Bill(
            user_id=user,
            title=args['title'],
            amount=args['amount'],
            due_date=args['due_date']
        )
        db.session.add(new_bill)
        db.session.commit()
        return new_bill.to_dict(), 201

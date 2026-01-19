from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import SavingsGoal

parser = reqparse.RequestParser()
parser.add_argument('title', required=True)
parser.add_argument('target_amount', type=float, required=True)
parser.add_argument('current_amount', type=float, default=0.0)

class SavingsResource(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        goals = SavingsGoal.query.filter_by(user_id=user).all()
        return [g.to_dict() for g in goals], 200

    @jwt_required()
    def post(self):
        args = parser.parse_args()
        user = get_jwt_identity()
        goal = SavingsGoal(
            user_id=user,
            title=args['title'],
            target_amount=args['target_amount'],
            current_amount=args['current_amount']
        )
        db.session.add(goal)
        db.session.commit()
        return goal.to_dict(), 201

from flask_restful import Resource, reqparse
from ..models import SavingsGoal
from .. import db

parser = reqparse.RequestParser()
parser.add_argument("name", type=str, required=True)
parser.add_argument("target_amount", type=float, required=True)
parser.add_argument("current_amount", type=float, default=0)

class SavingsResource(Resource):
    def get(self):
        goals = SavingsGoal.query.all()
        return [g.to_dict() for g in goals], 200

    def post(self):
        data = parser.parse_args()
        goal = SavingsGoal(**data)
        db.session.add(goal)
        db.session.commit()
        return goal.to_dict(), 201

class SavingsDetailResource(Resource):
    def put(self, id):
        goal = SavingsGoal.query.get_or_404(id)
        args = parser.parse_args()
        goal.current_amount = args["current_amount"]
        db.session.commit()
        return goal.to_dict(), 200

    def delete(self, id):
        goal = SavingsGoal.query.get_or_404(id)
        db.session.delete(goal)
        db.session.commit()
        return {"message": "Deleted successfully"}, 200

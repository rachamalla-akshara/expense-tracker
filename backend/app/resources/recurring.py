from flask_restful import Resource, reqparse
from ..models import RecurringPayment
from .. import db

parser = reqparse.RequestParser()
parser.add_argument("name", type=str, required=True)
parser.add_argument("amount", type=float, required=True)
parser.add_argument("interval", type=str, required=True)  # e.g., monthly

class RecurringResource(Resource):
    def get(self):
        payments = RecurringPayment.query.all()
        return [p.to_dict() for p in payments], 200

    def post(self):
        data = parser.parse_args()
        new_payment = RecurringPayment(**data)
        db.session.add(new_payment)
        db.session.commit()
        return new_payment.to_dict(), 201

class RecurringDetailResource(Resource):
    def delete(self, id):
        payment = RecurringPayment.query.get_or_404(id)
        db.session.delete(payment)
        db.session.commit()
        return {"message": "Deleted successfully"}, 200

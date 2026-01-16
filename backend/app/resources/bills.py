from flask_restful import Resource, reqparse
from ..models import Bill
from .. import db

parser = reqparse.RequestParser()
parser.add_argument("name", type=str, required=True)
parser.add_argument("amount", type=float, required=True)
parser.add_argument("due_date", type=str, required=True)

class BillsResource(Resource):
    def get(self):
        bills = Bill.query.all()
        return [b.to_dict() for b in bills], 200

    def post(self):
        data = parser.parse_args()
        bill = Bill(**data, paid=False)
        db.session.add(bill)
        db.session.commit()
        return bill.to_dict(), 201

class BillDetailResource(Resource):
    def put(self, id):
        bill = Bill.query.get_or_404(id)
        bill.paid = not bill.paid
        db.session.commit()
        return bill.to_dict(), 200

    def delete(self, id):
        bill = Bill.query.get_or_404(id)
        db.session.delete(bill)
        db.session.commit()
        return {"message": "Deleted successfully"}, 200

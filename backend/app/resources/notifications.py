from flask import Blueprint, request, jsonify
from flask_mail import Message
from app import mail

notifications_bp = Blueprint("notifications_bp", __name__)

@notifications_bp.route("/notifications", methods=["POST"])
def send_notification():
    data = request.get_json()
    to_email = data.get("to")
    subject = data.get("subject")
    body = data.get("body")

    if not all([to_email, subject, body]):
        return {"msg": "Missing required fields"}, 400

    try:
        msg = Message(subject=subject,
                      recipients=[to_email],
                      body=body)
        mail.send(msg)
        return {"msg": f"Email sent to {to_email}"}, 200
    except Exception as e:
        return {"msg": f"Error sending email: {str(e)}"}, 500

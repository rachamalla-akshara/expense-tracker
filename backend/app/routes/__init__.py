from flask import Blueprint, jsonify

root_bp = Blueprint("root_bp", __name__)

@root_bp.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

print("🔥 MY BACKEND APP.PY IS RUNNING 🔥")

from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Backend working!"})

@app.route("/transactions")
def get_transactions():
    return jsonify([
        {"id": 1, "category": "Food", "amount": -200},
        {"id": 2, "category": "Salary", "amount": 5000}
    ])

if __name__ == "__main__":
    app.run(debug=True, port=5001)



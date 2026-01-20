from app import create_app, db
from app.models import Transaction  # make sure your model exists
from datetime import date

app = create_app()
app.app_context().push()

# Optional: clear old transactions
Transaction.query.delete()
db.session.commit()

# Add dummy transactions
t1 = Transaction(user_id=1, amount=50.0, category="Food", date=date(2026, 1, 15))
t2 = Transaction(user_id=1, amount=120.0, category="Utilities", date=date(2026, 1, 18))
t3 = Transaction(user_id=2, amount=75.5, category="Entertainment", date=date(2026, 1, 20))
t4 = Transaction(user_id=1, amount=200.0, category="Shopping", date=date(2026, 1, 22))

db.session.add_all([t1, t2, t3, t4])
db.session.commit()

print("✅ Dummy transactions added successfully!")

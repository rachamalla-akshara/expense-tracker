💰 Expense Tracker
Project Setup

Follow these steps to get the project running locally and access the live version.

Step 1: Frontend Setup
Open Command Prompt and navigate to the frontend folder:
cd "C:\Users\raksh\OneDrive\Desktop\expense-tracker-main\frontend"
Install required packages:
npm install
Set the port for the frontend:
set PORT=4001
Start the frontend server:
npm start
The frontend will run on: http://localhost:4001
Step 2: Backend Setup
Navigate to the backend folder:
cd "C:\Users\raksh\OneDrive\Desktop\expense-tracker-main\backend"
Create a virtual environment:
python -m venv venv
Activate the virtual environment:
venv\Scripts\activate
Install the backend dependencies:
pip install -r requirements.txt
Run the backend server:
python run.py
Step 3: Login Credentials

Use the following credentials to log in:

Email	Password
achu@gmail.com
	12345
Step 4: Ngrok Link

Access the live app using Ngrok:

https://b364-152-59-201-38.ngrok-free.app/login

Step 5: Database Access

To view or check data:

Use DB Browser for SQLite (or your preferred database viewer).
Open the database file located in the backend folder.
Browse tables to inspect records and data.

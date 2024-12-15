Invoice Reminder Automation System

Overview
The Invoice Reminder Automation System is a full-stack web application that streamlines invoice management and automates payment reminders. It integrates Google OAuth for secure user authentication and utilizes Zapier Webhooks for automated reminders, ensuring timely follow-ups on pending or overdue invoices.

Features
🌟 Secure Authentication: Login with Google OAuth for seamless and secure access.
📊 Invoice Dashboard: View and manage invoices with sorting, searching, and filtering functionalities.
🚀 Automated Reminders: Send payment reminders directly via Zapier Webhooks.
🔎 Search & Sort: Quickly locate invoices using client names, emails, or statuses.
🛡️ Token-Based Protection: Secure API endpoints using JWT authentication.
🖥️ Responsive UI: User-friendly and modern interface powered by React.

Tech Stack
Technology	Description
Frontend	React.js, HTML, CSS
Backend	Node.js, Express.js
Authentication	Google OAuth (Passport.js)
API Integration	Zapier Webhooks
State Management	React Hooks
Styling	Custom CSS
Deployment	Local Development Environment
Screenshots
Login Page
Secure login using Google OAuth.


Invoice Dashboard
View, sort, and filter invoices. Send reminders with a single click.


Setup and Installation
Prerequisites
Before you begin, ensure the following software is installed:

Node.js (v14 or above)
npm (Node Package Manager)
Zapier Webhook URL
Google OAuth Credentials (Client ID & Client Secret)
Backend Setup

Clone the repository:
bash
git clone https://github.com/Surajwalia1/Invoice-Reminder-Automation-System.git
cd Invoice-Reminder-Automation-System

Install backend dependencies:
bash
npm install

Replace the following credentials in server.js:
Google OAuth Client ID and Client Secret.
Zapier Webhook URL.
JWT secret key.

Start the backend server:
bash
node server.js
The backend server will run on http://localhost:5008.

Frontend Setup
Navigate to the frontend directory:
bash
cd frontend

Install frontend dependencies:
bash
npm install

Start the React development server:
bash
npm run dev
The frontend will run on http://localhost:5173.

How It Works
1. Authentication
Users log in securely via Google OAuth.
JWT tokens are generated and passed to the frontend for secure API access.
2. Invoice Dashboard
Users can view a list of invoices with details like:
Client Name and Email
Invoice Amount
Due Date
Status (Pending, Overdue, Paid)
Invoices can be searched and sorted dynamically.
3. Send Reminders
Users can send reminders for unpaid invoices.
A Zapier Webhook is triggered to send automated notifications via email or other integrations.
API Endpoints
1. Google OAuth
GET /auth/google: Redirects to Google for authentication.
GET /auth/google/callback: Handles OAuth callback and generates a JWT token.
2. Invoices
GET /api/invoices: Fetches a list of invoices. (Protected route)
3. Trigger Reminder
POST /api/trigger-automation:
Sends invoice details to the Zapier Webhook for automation.
Example payload:
json
Copy code
{
  "invoiceId": 1,
  "invoiceAmount": 500,
  "dueDate": "2024-12-20",
  "recipientEmail": "Suraj@gmail.com"
}

Project Structure
bash
Invoice-Reminder-Automation-System/
│
├── server.js            # Backend server (Node.js & Express)
│
├── frontend/            # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InvoicePage.jsx   # Invoice dashboard
│   │   │   ├── LoginPage.jsx     # Google login page
│   │   ├── styles/               # CSS stylesheets
│   │   ├── App.jsx               # Root React component
│   │   └── main.jsx              # React entry point
│
├── package.json         # Backend dependencies
├── README.md            # Project documentation
└── .env                 # Environment variables (optional)
Environment Variables

Set the following environment variables:
env
PORT=5008
GOOGLE_CLIENT_ID=145235494549-9t5nj618h0nc1hgqalodr8nhhpckgjio.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET= 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
FRONTEND_URL=http://localhost:5173
ZAPIER_TRIGGER_URL=https://hooks.zapier.com/hooks/catch/21017940/2sg5d41/


Contributing
Contributions are welcome! To contribute:
Fork the repository.
Create a new feature branch.
Commit your changes.
Submit a pull request.

License
This project is licensed under the MIT License. See LICENSE for details.

Author
Suraj Walia


Enjoy Automated Invoice Management! 🚀

Contest Tracker – Competitive Programming Scheduler
Track upcoming coding contests, bookmark your favorites, and never miss a competition again.
This project is built for competitive programmers who want to stay updated and organized, with automated SMS reminders.

Features
Fetch Upcoming & Past Contests

Real-time data from platforms like Codeforces.

Show time remaining before contests start.

Display past contests from the last 7 days.

Bookmark Contests

Save contests you're interested in.

View all bookmarked contests in a dedicated section.

Contest Reminders

Get SMS notifications before a contest starts.

Set a custom reminder time (e.g., 1 hour or 30 minutes before).

Solution Integration (Optional)

Add YouTube solution links for past contests manually.

Helps track your learning and revision.

Tech Stack
Frontend	Backend	Others
HTML, CSS, JS	Node.js, Express	Twilio (SMS API)
Axios	EJS (Templating)	Codeforces API
Vercel		

Project Structure
bash
Copy
Edit
contest-tracker/
├── public/                 # Static files (CSS, JS)
├── views/                  # EJS templates
│   ├── index.ejs           # Homepage
│   └── bookmarks.ejs       # Bookmarked contests
├── routes/
│   └── index.js            # Route handling
├── services/
│   └── contestFetcher.js   # Codeforces contest fetching
├── reminders/
│   └── reminderService.js  # SMS reminder logic
├── app.js                  # Entry point
├── .env                    # Environment variables
└── README.md
Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/contest-tracker.git
cd contest-tracker
2. Install dependencies
bash
Copy
Edit
npm install
3. Setup environment variables
Create a .env file in the root directory:

env
Copy
Edit
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+your_twilio_phone_number
USER_PHONE=+recipient_phone_number
4. Run the server
bash
Copy
Edit
node app.js
Open your browser at http://localhost:3000

Features Overview
Home Page: View upcoming and recent contests.

Bookmarking: Save contests for later.

SMS Reminder: Schedule a reminder before the contest starts.

Planned Enhancements
 User authentication with login/register

 Persistent storage of bookmarks and user data using a database

 Add more contest platforms (LeetCode, CodeChef)

 Upload and manage YouTube links more efficiently

 Dockerize the project for simplified deployment

Author
Shivalika
Competitive Programmer & Web Developer
Instagram: @_shivalikaaaa

License
This project is licensed under the MIT License.

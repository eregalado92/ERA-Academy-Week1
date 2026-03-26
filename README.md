# ERA Academy — Week 1

Full-stack project built during Week 1 of the ERA Academy backend development course.

## What's Inside

### frontend/
- HTML, CSS, JavaScript
- Signup and Login forms connected to the backend
- Section-based layout loaded dynamically

### backend/
- Express.js server
- MySQL database connection via mysql2
- API endpoints:
  - GET  /students
  - GET  /classes
  - GET  /enrollments
  - POST /students
  - POST /users
  - POST /login

## How to Run the Backend

1. Open the backend/ folder in VS Code
2. Create a .env file with: DB_PASSWORD=your_mysql_password
3. Run: npm install
4. Run: node server.js

## How to Run the Frontend

1. Open the frontend/ folder in VS Code
2. Right-click index.html → Open with Live Server

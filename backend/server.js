const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running with MySQL");
});

// GET /students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (error, results) => {
    if (error) return res.status(500).json({ error: "Failed to get students" });
    res.json(results);
  });
});
// POST /students
app.post("/students", (req, res) => {
  const { first_name, last_name, grade_level } = req.body;
  if (!first_name || !last_name || !grade_level) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const sql =
    "INSERT INTO students (first_name, last_name, grade_level) VALUES (?, ?, ?)";
  db.query(sql, [first_name, last_name, grade_level], (error, results) => {
    if (error) return res.status(500).json({ error: "Failed to add student" });
    res
      .status(201)
      .json({
        message: "Student added successfully",
        studentId: results.insertId,
      });
  });
});

// POST /users
app.post("/users", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }
  const specialChar = /[!@#$%]/;
  if (!specialChar.test(password)) {
    return res
      .status(400)
      .json({
        error:
          "Password must include at least one special character: ! @ # $ %",
      });
  }
  const sql =
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [first_name, last_name, email, password], (error, results) => {
    if (error) return res.status(500).json({ error: "Failed to create user" });
    res
      .status(201)
      .json({ message: "User created successfully", userId: results.insertId });
  });
});

// POST /login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }
  const specialChar = /[!@#$%]/;
  if (!specialChar.test(password)) {
    return res
      .status(400)
      .json({
        error:
          "Password must include at least one special character: ! @ # $ %",
      });
  }
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (error, results) => {
    if (error) return res.status(500).json({ error: "Something went wrong" });
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful" });
  });
});

// GET /classes
app.get("/classes", (req, res) => {
  const sql = "SELECT * FROM classes";
  db.query(sql, (error, results) => {
    if (error) return res.status(500).json({ error: "Failed to get classes" });
    res.json(results);
  });
});
// GET /enrollments
app.get("/enrollments", (req, res) => {
  const sql = `
    SELECT
      students.first_name,
      students.last_name,
      classes.class_name,
      classes.teacher_name
    FROM enrollments
    JOIN students ON enrollments.student_id = students.id
    JOIN classes  ON enrollments.class_id   = classes.id
  `;
  db.query(sql, (error, results) => {
    if (error)
      return res.status(500).json({ error: "Failed to get enrollments" });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

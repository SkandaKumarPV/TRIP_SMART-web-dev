const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const isAuthenticated = require("./middleware/authMiddleware");

// Initialize app and database
const app = express();
const dbPath = path.join(__dirname, "databases", "users.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Ensure the "users" table exists
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Users table initialized.");
      }
    }
  );
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// User routes (login, signup, etc.)
app.use("/users", userRoutes(db));

// Home routes (home, tours, gallery, etc.)
app.use("/", homeRoutes);

// Protect the home page with isAuthenticated middleware
app.get("/", isAuthenticated, (req, res) => {
  res.render("home", { user: req.session.user });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

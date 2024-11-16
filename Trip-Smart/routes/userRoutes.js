const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  const router = express.Router();

  // Render login page
  router.get("/login", (req, res) => {
    res.render("login", {
      formValues: {},
      formErrors: {},
      errorMessage: null,
    });
  });

  // Render signup page
  router.get("/signup", (req, res) => {
    res.render("signup", {
      formValues: {},
      formErrors: {},
      errorMessage: null,
    });
  });

  // Handle login
  router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const formErrors = {};
    if (!username) formErrors.username = "Username is required!";
    if (!password) formErrors.password = "Password is required!";

    if (Object.keys(formErrors).length > 0) {
      return res.render("login", {
        formValues: req.body,
        formErrors,
        errorMessage: null,
      });
    }

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
      if (err || !user || !(await bcrypt.compare(password, user.password))) {
        return res.render("login", {
          formValues: req.body,
          formErrors: {},
          errorMessage: "Invalid credentials",
        });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "secret", {
        expiresIn: "1h",
      });

      console.log("Token:", token);
      res.redirect("/dashboard"); // Replace with your dashboard route
    });
  });

  // Handle signup
  router.post("/register", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    const formErrors = {};
    if (!username) formErrors.username = "Username is required!";
    if (!email) formErrors.email = "Email is required!";
    if (!password) formErrors.password = "Password is required!";
    if (password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match!";

    if (Object.keys(formErrors).length > 0) {
      return res.render("signup", {
        formValues: req.body,
        formErrors,
        errorMessage: null,
      });
    }

    db.get(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, username], async (err, row) => {
      if (row) {
        return res.render("signup", {
          formValues: req.body,
          formErrors: {},
          errorMessage: "Email or username already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("Database error:", err.message);
            return res.render("signup", {
              formValues: req.body,
              formErrors: {},
              errorMessage: "Internal server error",
            });
          }
          res.redirect("/users/login");
        }
      );
    });
  });

  return router;
};

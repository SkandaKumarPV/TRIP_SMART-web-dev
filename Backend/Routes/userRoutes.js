const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

module.exports = (db, SECRET_KEY) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;
    if (!email || !username || !password || password !== confirmPassword) {
      return res.status(400).send({ error: "Invalid input" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
        [email, username, hashedPassword],
        (err) => {
          if (err) return res.status(500).send({ error: err.message });
          res.status(201).send({ message: "User registered" });
        }
      );
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  });

  router.post("/login", (req, res) => {
    const { identifier, password } = req.body;
    db.get(
      `SELECT * FROM users WHERE email = ? OR username = ?`,
      [identifier, identifier],
      async (err, user) => {
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).send({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
        res.send({ token });
      }
    );
  });

  return router;
};

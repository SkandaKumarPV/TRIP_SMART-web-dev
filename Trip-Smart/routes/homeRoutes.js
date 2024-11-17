const express = require("express");
const router = express.Router();

// Render home page
router.get("/", (req, res) => {
  res.render("home", {
    title: "Welcome to TripSmart",
    description: "Plan your travel journey with ease and comfort!",
  });
});

// Render about page
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    description: "Learn more about TripSmart and our mission to make travel seamless.",
  });
});

// Render tours page
router.get("/tours", (req, res) => {
  res.render("tours", {
    title: "Explore Tours",
    description: "Discover amazing places and destinations tailored for you.",
  });
});

// Render gallery page
router.get("/gallery", (req, res) => {
  res.render("gallery", {
    title: "Travel Gallery",
    description: "Browse through our curated collection of stunning travel images.",
  });
});

// Render contact page
router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    description: "Get in touch with TripSmart for your travel needs.",
  });
});

module.exports = router;

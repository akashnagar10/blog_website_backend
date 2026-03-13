const express = require("express");

const router = express.Router();
const User = require("../models/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    User.matchPassword(email, password).then((isMatch) => {
      if (isMatch) {
        return res.redirect("/");
      } else {
        return res.status(401).send("Invalid credentials");
      }
    });
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({ fullName, email, password });

  return res.redirect("/");
});

module.exports = router;

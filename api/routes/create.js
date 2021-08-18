const router = require("express").Router();
const { response } = require("express");
const User = require("../models/User");

router.post("/create", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    event: req.body.event,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;

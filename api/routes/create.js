const router = require("express").Router();
const { response } = require("express");
const User = require("../models/User");
const express = require("express");
const app = express();

//Routes
/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new card
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:          
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             
 *       500:
 *         description: Some server error
 */

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
      message: "Card already Present",
    });
  }
});


module.exports = router;

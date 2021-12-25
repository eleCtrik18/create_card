const router = require("express").Router();
const { response } = require("express");
const User = require("../models/User");
const express = require("express");
const app = express();
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCard:
 *       type: object
 *       required:
 *         - name
 *         - event
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the card
 *         event:
 *           type: string
 *           description: The event 
 *       example:
 *         
 *         name: "Card Name"
 *         event: "Card Event"
 */

 /**
  * @swagger
  * tags:
  *   name: Card
  *   description: The cards managing API
  */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new card
 *     tags: [Card]
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateCard'
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

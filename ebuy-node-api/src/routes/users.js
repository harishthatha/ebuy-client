const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send("Error " + error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.send("Error " + error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      body: { name },
    } = req;

    const user = new User({
      name,
    });

    console.log(req.body);
    const userData = await user.save();
    res.json(userData);
  } catch (error) {
    res.send("Error " + error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const {
      body: { name },
    } = req;

    const user = await User.findById(id);
    if (!user) throw new Error(`User not found with Id ${id}`);
    user.name = name;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log("in error ");
    res.send("Error " + error);
  }
});

module.exports = router;

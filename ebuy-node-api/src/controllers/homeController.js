const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Response from get users");
});

router.get("/", (req, res) => {
  console.log("in node server / get");
  res.send("hello user");
});

router.get("/api/videos", (req, res) => {
  res.send([1, 2, 3, 4, 3333, 900999]);
});

module.exports = router;

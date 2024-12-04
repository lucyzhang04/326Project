//Set up for routes for feed screen.
const express = require("express");
const db = require("../controller/UserController");
const router = express.Router();

//Route for adding submission to database from user submission.
router.post("/add_user", async (req, res) => {
  console.log("Reached add subs endpoint");
  //Using controller to call addSubmission and add submission to db.
  await db.addSubmission(req, res);
  res.end();
});
//exporting so endpoints can be imported in index.js
module.exports = router;

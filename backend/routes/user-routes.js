//Set up for routes for feed screen.
const express = require("express");
const db = require("../controller/UserController");
const router = express.Router();

//Route for adding submission to database from user submission.
router.post("/add_user", async (req, res) => {
  console.log("Reached add subs endpoint");
  //Using controller to call addSubmission and add submission to db.
  await db.addUser(req, res);
  res.end();
});

// Route to check if a user with a specific username and refresh token is in the database.
// If the user is in the database, the user's access token is updated.
// If the user is not in the database, the user is added to the database.
router.post("/find_or_create", async (req, res) => {
  console.log("Reached find user endpoint");
  //Using controller to call findUser and check if user is in db.
  await db.findOrCreateUser(req, res);
  res.end();
});

//exporting so endpoints can be imported in index.js
module.exports = router;

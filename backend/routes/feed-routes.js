//Set up for routes for feed screen.
const express = require("express"); 
//Importing SubmissionController to perform CRUD operations on database
const db = require("../controller/SubmissionController");
const router = express.Router(); 

//Route for getting all submissions in database to load initial feed screen.
router.get("/get_all_subs", async (req, res) => {
    console.log("Reached get all subs endpoint")
    //calling getAllSubmissions method using controller
    await db.getAllSubmissions(req, res); 
    res.end(); 
})

//Route for getting submissions from the current day
router.get("/get_today_subs", async (req, res) => {
    console.log("Reached get todays subs endpoint");
    //Using controller to call getSubsToday() and retrieve correct submissions.
    await db.getSubsToday(req, res); 
    res.end(); 
})

//Route for adding submission to database from user submission.
router.post("/add_sub", async (req, res) => {
    console.log("Reached add subs endpoint")
    //Using controller to call addSubmission and add submission to db.
    await db.addSubmission(req, res); 
    res.end(); 
})
//exporting so endpoints can be imported in index.js
module.exports = router;
const express = require("express");
const router = express.Router();
//import SubmissionController for performing CRUD operations. 
const db = require("../controller/SubmissionController");

//Route for getting the top 5 most-contributed entries from database
router.get("/get-top-five", async(req, res) => {
    console.log("Reached the top 5 endpoint");

    await db.getTopFive(req, res);
    //res.end();
})

//Route for getting the top 3 contributors over the past week from submission database.
router.get("/get-top-contributors", async(req, res) => {
    console.log("Reached top contributors endpoint");

    await db.getTopContributor(req, res);
})

//Route for getting the given user's total contributions (in min) from subission database
router.get("/get-user-contribution-time", async(req, res) => {
    console.log("Reached user contribution total time endpoint");

    await db.getUserContributionTime(req, res);
})

//Route for getting the given user's total # of contributions
router.get("/get-user-contributions", async(req, res) => {
    console.log("Reached user contribution total endpoint");

    await db.getUserTotalContributions(req, res);
})

//Route for getting the user with the longest active streak
router.get("/get-longest-streak", async(req, res) => {
    console.log("Reached longest-streak endpoint.");

    await db.getLongestStreak(req, res);
})
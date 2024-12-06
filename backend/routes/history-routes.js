const express = require("express"); 
const db = require("../controller/SubmissionController");
const router = express.Router();

//Route for getting song submissions associated with a particular user (you)
router.get("/get-history", async(req, res) => {
    console.log("Reached history endpoint");
    console.log(req.body)
    await db.getYourSubmissions(req, res);
})

//exporting so endpoints can be imported in index.js
module.exports = router;
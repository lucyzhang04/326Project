//import ModelFactory from "../model/ModelFactory.js";
const ModelFactory = require("../model/ModelFactory.js");
const Events = require("../eventhub/Events.js"); 
const eventHub = require("../eventhub/EventHub.js");

class SubmissionController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Get all submissions
  async getAllSubmissions(req, res) {
    const submissions = await this.model.readSubmission();
    res.json({ submissions });
  }

  // Add a new submission
  async addSubmission(req, res) {
    try {
      // Check if 'submission' is provided in the request body
      if (!req.body || !req.body.title|| !req.body.artist) {
        return res.status(400).json({ error: "Title and artist are required." });
      }

      // Create the new submission object with a unique ID
      const sub = await this.model.createSubmission(req.body);
      //Notify subscribers of addition of new sub
      eventHub.publish(Events.NewSub, req.body); 
      
      // Send back the created submission as the response
      return res.status(201).json(sub);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error adding submission:", error);
      return res
        .status(500)
        .json({ error: "Failed to add submission. Please try again." });
    }
  }

  // Clear all submissions
  async clearSubmissions(req, res) {
    await this.model.deleteSubmission();
    res.json(await this.model.readSubmission());
  }

  async getSubsToday(req, res){
    return res.json(await this.model.getSubsToday());
  }

  //calls database method to retrieve 5 most-shared songs/podcasts for the given day. 
  async getTopFive(req, res){
    const trending = await this.model.getTrending();

    //need to check the format of trending to see what the json wrapping on it looks like 
    return res.json({trending});
  }

  //calls database method to retieve top 3 users with  most contributions over the past week. 
  async getTopContributors(req, res){
    const topContributors = await this.model.getTopContributors();

    return res.json({topContributors});
  }

  //calls database to calculate the total sum of
  async getUserContributionTime(req, res){
    console.log(req);

    if(!req.body || !req.body.user_name){
      return res.status(400).json({ error: "user_name is required." });
    }

    const user_name = req.body.user_name;

    const userContributionTime = await this.model.getUserContributionTime(user_name);

    return res.json({userContributionTime});
  }

  async getUserTotalContributions(req, res){
    /*if(!req.body || !req.body.user_name){
      return res.status(400).json({ error: "UserID is required." });
    }*/

    if(!req.headers || !req.headers.user_name){
      return res.status(400).json({ error: "user_name is required." });
    }

    const user_name = req.headers.user_name;

    const userTotalContributions = await this.model.getUserTotalContributions(user_name);

    return res.json({userTotalContributions});
  }

  async getLongestStreak(req, res){
    const longestStreak = await this.model.getLongestStreak();

    return res.json({longestStreak});
  }

  async getYourSubmissions(req, res){
    console.log(req.query);
    if(!req.query || !req.query.user_name){
      console.log("in unwanted case");
      return res.status(400).json({ error: "user_name is required." });
    }
    const user_name = req.query.user_name;
    const yourSubmissions = await this.model.getYourSubmissions(user_name);
    return res.json({yourSubmissions});
  }
}

//export default new SubmissionController();
const submissionController = new SubmissionController(); 
module.exports = submissionController;

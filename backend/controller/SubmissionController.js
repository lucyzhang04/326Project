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
      console.log(req.body);
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
}


//export default new SubmissionController();
const submissionController = new SubmissionController(); 
module.exports = submissionController;

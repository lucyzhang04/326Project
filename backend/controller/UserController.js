//import ModelFactory from "../model/ModelFactory.js";
const ModelFactory = require("../model/ModelFactory.js");
class UserController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Get all submissions
  async getAllUsers(_req, res) {
    const users = await this.model.readUser();
    res.json({ submissions: users });
  }

  // Add a new submission
  async addUser(req, res) {
    try {
      // Check if 'user' is provided in the request body
      if (!req.body || !req.body.username || !req.body.refresh_token) {
        return res
          .status(400)
          .json({ error: "Title and artist are required." });
      }

      // Create the new submission object with a unique ID
      const sub = await this.model.createUser(req.body);

      // Send back the created user as the response
      return res.status(201).json(sub);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ error: "Failed to add user. Please try again." });
    }
  }

  // Clear all submissions
  async clearUsers(req, res) {
    await this.model.deleteUser();
    res.json(await this.model.readUser());
  }
}

//export default new SubmissionController();
const userController = new UserController();
module.exports = userController;

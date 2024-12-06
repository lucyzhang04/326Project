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

  // Find a user with a specific username and refresh token
  async findOrCreateUser(req, res) {
    try {
      // Check if 'user' is provided in the request body
      if (!req.body || !req.body.username || !req.body.spotify_refresh_token) {
        console.log(
          "=> /user/find_or_create: missing username or refresh token. received body:\n",
          req.body,
        );
        return res
          .status(400)
          .json({ error: "Username and refresh token are required." });
      }
      // Find the user in the database
      const user = await this.findUser({
        spotify_refresh_token: req.body.spotify_refresh_token,
        username: req.body.username,
      });
      // If the user is found, send back the user as the response
      if (user) {
        return res.status(200).json(user);
      }
      // If the user is not found, add the user to the database
      const newUser = await this.model.createUser(req.body);
      // Send back the created user as the response
      return res.status(201).json(newUser);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error finding user:", error);
      return res
        .status(500)
        .json({ error: "Failed to find user. Please try again." });
    }
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

  async findUser(user) {
    return await this.model.findUser(user);
  }

  // Clear all submissions
  async clearUsers(_req, res) {
    await this.model.deleteUser();
    res.json(await this.model.readUser());
  }
}

//export default new SubmissionController();
const userController = new UserController();
module.exports = userController;

//import ModelFactory from "../model/ModelFactory.js";
const ModelFactory = require("../model/ModelFactory.js");
const Events = require("../eventhub/Events.js"); 
const eventHub = require("../eventhub/EventHub.js");

class QuotesController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Get all quotes
  async getAllQuotes(req, res) {
    const quotes = await this.model.readQuote();
    res.json({ quotes });
  }

  // Add a new quote
  async addQuote(req, res) {
    try {
      // Check if 'quote' and 'person' are provided in the request body
      if (!req.body || !req.body.quote || !req.body.person) {
        return res.status(400).json({ error: "Quote and person are required." });
      }

      // Create the new submission object with a unique ID
      const quote = await this.model.createQuote(req.body);
      
      // Send back the created quote as the response
      return res.status(201).json(quote);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error adding quote:", error);
      return res
        .status(500)
        .json({ error: "Failed to add quote. Please try again." });
    }
  }

  // Clear all quotes
  async clearQuotes(req, res) {
    await this.model.deleteQuote();
    res.json({ message: "Quotes cleared." });
  }
}


const quotesController = new QuotesController(); 
module.exports = quotesController;

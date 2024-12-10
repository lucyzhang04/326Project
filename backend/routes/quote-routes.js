//Set up for routes for quotes.
const express = require("express"); 
//Importing QuotesController to perform CRUD operations on database
const db = require("../controller/QuotesController");
const router = express.Router(); 
const SQLiteModel = require("../model/SQLiteModel");
const { Op } = require("sequelize");

// route for getting all quotes
router.get("/get_all_quotes", async (req, res) => {
    console.log("Reached get all quotes endpoint");
    await db.getAllQuotes(req, res);  
})

//Route for adding a quote.
router.post("/add_quote", async (req, res) => {
    console.log("Reached add quote endpoint")
    //Using controller to call addQuote and add quote to db.
    await db.addQuote(req, res);
})

//Route for clearing quotes
router.delete("/clear_quotes", async (req, res) => {
  console.log("Reached clear quotes endpoint");
  await db.clearQuotes(req, res);
});

//Route for getting daily quote
  router.get("/daily-quote", async (req, res) => {
    try {
      // utilizes getQuote() which pulls the existing quote or generates a new one if needed
      let currQuote = await SQLiteModel.getQuote();

      // if unsuccessful, error message is displayed
      if (!currQuote || !currQuote.dataValues) {
        throw new Error("Quote not in database");
      }

      // quote data is pulled here 
      const quoteToSend = {quote: currQuote.dataValues.quote, person: currQuote.dataValues.person};
      res.json(quoteToSend);
    } catch (error) {
      console.error("Error loading quote:", error);

      // default quote in case of error
      res.status(500).json({ 
        quote: "326 is the key to happiness. Something is wrong with your code.", 
        person: "Tim Richards" 
      });
    }
  });

// Route for getting a quote by date
router.get("/quote-by-date", async (req, res) => {
  try {
    // identify the date
    const { date } = req.query;

    // make sure a valid date is given
    if (!date) {
      return res.status(400).json({ error: "Date needed." });
    }

    // retrieve the quote using the getQuoteByDate method
    let currQuote = await SQLiteModel.getQuoteByDate(date);

    // error message if there is no quote for the provided date
    if (!currQuote || !currQuote.dataValues) {
      throw new Error("Quote not in database.");
    }

    // quote data is pulled here
    const quoteToSend = { quote: currQuote.dataValues.quote, person: currQuote.dataValues.person };
    res.json(quoteToSend);
  } catch (error) {
    console.error("Error loading quote:", error);
    
    // default quote in case of error
    res.status(500).json({ 
      quote: "326 is the key to happiness", 
      person: "Tim Richards" 
    });
  }
});


module.exports = router;
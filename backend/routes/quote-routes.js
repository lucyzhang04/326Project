//Set up for routes for quotes.
const express = require("express"); 
//Importing QuotesController to perform CRUD operations on database
const db = require("../controller/QuotesController");
const router = express.Router(); 
const SQLiteModel = require("../model/SQLiteModel");
const { Op } = require("sequelize");


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
      let currQuote = await SQLiteModel.getQuote();
      if (!currQuote || !currQuote.dataValues) {
        throw new Error("Quote not in database");
      }
      const quoteToSend = {quote: currQuote.dataValues.quote, person: currQuote.dataValues.person};
      res.json(quoteToSend);
    } catch (error) {
      console.error("Error loading quote:", error);
      res.status(500).json({ 
        quote: "326 is the key to happiness", 
        person: "Tim Richards" 
      });
    }
  });

//exporting so endpoints can be imported in index.js
module.exports = router;
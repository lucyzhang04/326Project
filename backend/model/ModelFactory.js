// import SQLiteModel from "./SQLiteModel.js";
const SQLiteModel = require("./SQLiteModel.js");

class _ModelFactory {
  async getModel(model = "sqlite") {
    console.log("Fetching model:", model);
    if (model === "sqlite") {
      return SQLiteModel;
    //clears tables in database instance (hard reset)
    } else if (model === "sqlite-fresh") {
      await SQLiteModel.init(true);
      return SQLiteModel;
    } 
  }
}

const ModelFactory = new _ModelFactory();
// export default ModelFactory;
module.exports = ModelFactory;
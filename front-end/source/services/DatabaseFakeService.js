import Service from "./Service.js";
import { mock_trending_fetch } from "../../utility/mock_trending_fetch.js";
import { Events } from "../eventhub/Events.js";
import { mock_submission_fetch } from "../../utility/submission-fetch.js";

export class DatabaseFakeService extends Service {
  constructor() {
    super();
  }

  /**
   * requests the top 5 trending songs from the database
   */
  async getTopFive(v0) {
    return mock_trending_fetch("http://localhost:3000/get_top_five", v0)
           .then(response => response.ok ? response.json() : Promise.reject("Could not retrieve trending data."))
           .catch(error => console.log(error));
    
    
    /*const response = await mock_trending_fetch("http://localhost:3000/get_top_five", {
      method: "POST",
    });
    const data = await response.json();
    //console.log(data);
    return data;*/
  }

  async getSubmissions(dataSet) {
    return mock_submission_fetch("http://127.0.0.1:5500/front-end/feed.html", dataSet)
    .then(response => response.ok ? response.json() : Promise.reject("Could not retrieve submissions correctly"))
    .catch(error => "Error"); 
}


  addSubscriptions() {
    this.subscribe(Events.Search, (data) => {
      this.searchSongs(data);
    });
  }
}

import Service from "./Service.js";
import { mock_trending_fetch } from "../../utility/mock_trending_fetch.js";
import { Events } from "../eventhub/Events.js";

export class DatabaseFakeService extends Service {
  constructor() {
    super();
  }

  /**
   * requests the top 5 trending songs from the database
   */
  async getTopFive() {
    const response = await mock_trending_fetch("http://localhost:3000/get_top_five", {
      method: "POST",
    });
    const data = await response.json();
    //console.log(data);
    return data;
  }


  addSubscriptions() {
    this.subscribe(Events.Search, (data) => {
      this.searchSongs(data);
    });
  }
}

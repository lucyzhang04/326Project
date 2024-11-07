import Service from "./Service.js";
import { fetch } from "../utility/fetch.js";

export class SpotifyAPIFakeService extends Service {
  constructor() {
    super();
  }

  /**
   * @param {string} query
   */
  async searchSongs(query) {
    const response = await fetch("http://localhost:3000/search_song", {
      method: "POST",
      body: JSON.stringify(query),
    });
    const data = await response.json();
    return data;
  }

  addSubscriptions() {
    this.subscribe(Events.Search, (data) => {
      this.searchSongs(data);
    });
  }
}

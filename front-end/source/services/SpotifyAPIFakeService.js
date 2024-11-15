import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";

export default class SpotifyAPIFakeService extends Service {
  constructor() {
    super();
    this.hips = null;
  }

  async loadHips() {
    try {
      const response = await fetch("./source/services/hips.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.hips = await response.json();
    } catch (error) {
      console.error("Failed to load hips.json:", error);
    }
  }

  /**
   * @param {string} query
   */
  async searchSongs(query) {
    // TODO: Something is not working when I try importing fetch. Rather than wasting time
    // trying to figure this out, let's just use the fetch function directly in MS4.
    // const response = await fetch("http://localhost:3000/search_song", {
    //   method: "POST",
    //   body: JSON.stringify(query),
    // });
    // const data = await response.json();
    if (!this.hips) {
      await this.loadHips();
    }
    return this.hips;
  }

  addSubscriptions() {
    this.subscribe(Events.Search, (data) => {
      this.searchSongs(data);
    });
  }
}

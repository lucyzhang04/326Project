import Service from "./Service.js"
import { Events } from "../eventhub/Events.js"

export default class SpotifyAPIFakeService extends Service {
  constructor() {
    super()
    this.hips = null
  }

  async loadHips() {
    try {
      const response = await fetch("./source/services/hips.json")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      this.hips = await response.json()
    } catch (error) {
      console.error("Failed to load hips.json:", error)
    }
  }

  /**
   * @param {string} query
   * @param {string} username
   */
  async searchSongs(query, username) {

    const url = new URL('http://localhost:8888/spotify/search');
    const params = new URLSearchParams();
    params.append('query_type', 'track');
    params.append('query_literal', query); // Add another parameter
    params.append('user_name', username); // Add another parameter

    url.search = params.toString();

    this.hips = await fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

     console.log("JSON >>> "+this.hips);

    return this.hips
  }

  addSubscriptions() {
    this.subscribe(Events.Search, (data) => {
      this.searchSongs(data)
    })
  }
}

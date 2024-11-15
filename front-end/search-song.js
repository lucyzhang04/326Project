import { searchSong } from "./source/services/SpotifyAPIFakeService.js";

const inputElem = document.getElementById("podcast-song");

inputElem.addEventListener("input", async (event) => {
  const searchValue = event.target.value;
  const searchResults = await searchSong(searchValue);
  console.log(searchResults);
});

import SpotifyAPIFakeService from "./source/services/SpotifyAPIFakeService.js";

console.log("LOADED SEARCH SONG");

document.addEventListener("DOMContentLoaded", () => {
  const SAPIService = new SpotifyAPIFakeService();

  const inputElem = document.getElementById("podcast-song");
  const resultsElem = document.getElementById("results-list");
  const formElem = document.getElementById("user-form");

  if (!inputElem || !resultsElem || !formElem) {
    console.error("One or more elements not found");
    return;
  }

  // inputElem.addEventListener("input", async (event) => {
  //   const searchValue = event.target.value;
  //   // const searchResults = await SAPIService.searchSong(searchValue);
  //   const searchResults = { message: "test" };
  //   console.log(searchResults);
  // });

  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const searchValue = inputElem.value;
    const results = await SAPIService.searchSongs(searchValue);
    renderResults(results);
  });

  function renderResults(results) {
    console.log(results);
    results.tracks.items.forEach((result) => {
      const resultElem = document.createElement("div");
      resultElem.classList.add("result");
      const imgElem = document.createElement("img");
      imgElem.src = result.album.images[0].url;
      console.log(result.album.images[0].url);
      imgElem.alt = result.name;
      imgElem.width = 80;
      resultElem.appendChild(imgElem);

      const text = document.createElement("div");
      text.classList.add("result-text");
      const title = document.createElement("strong");
      title.innerText = result.name;

      const artist = document.createElement("p");
      artist.innerText = result.artists[0].name;

      text.appendChild(title);
      text.appendChild(artist);
      resultElem.appendChild(text);

      resultsElem.appendChild(resultElem);
    });
  }
});

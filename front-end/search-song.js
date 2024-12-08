import SpotifyAPIFakeService from "./source/services/SpotifyAPIFakeService.js";
let savedTracks = []; // To add/saved songs are stored here
console.log("LOADED SEARCH SONG");

document.addEventListener("DOMContentLoaded", () => {
  const SAPIService = new SpotifyAPIFakeService();

  const inputElem = document.getElementById("podcast-song");
  const usernameElem = document.getElementById("username");
  const resultsElem = document.getElementById("results-list");
  const formElem = document.getElementById("user-form");
  const savedElem = document.getElementById("saved-list");

  if (!inputElem || !resultsElem || !formElem || !savedElem) {
    console.error("One or more elements not found");
    return;
  }

  formElem.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const searchValue = inputElem.value;
    const usernameValue  = usernameElem.value;
    const results = await SAPIService.searchSongs(searchValue, usernameValue);
    renderResults(results);
  });

  document.querySelector('.saved-btn').addEventListener('click', function(event) {
    event.preventDefault();

    savedTracks.length === 0 ?
      (alert("Select at least one song please.")) : 
      (window.location.href = 'feed.html');
  });

  function renderResults(results) {
    console.log(results);
    resultsElem.innerHTML = ""; // Clear the results list
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

      // Click song to save the song
      resultElem.addEventListener("click", async () => {
        const trackIndex = savedTracks.findIndex(
          (track) => // Should work fine with just href but just in case
            track.name === result.name && track.artists[0].name === result.artists[0].name && track.href === result.href
        );
        trackIndex !== -1 ? 
          (savedTracks.splice(trackIndex, 1), resultElem.style.backgroundColor = "", updateSaved(savedTracks)) :
          (savedTracks.push(result), resultElem.style.backgroundColor = "#3267ad", updateSaved(savedTracks));
        console.log("Saved Tracks:", savedTracks); // Debug line
      });
      resultsElem.appendChild(resultElem);
    });
  }

  function updateSaved(savedTracks) {
    savedElem.innerHTML = "";
    savedTracks.forEach((savedTrack) => {
      const resultElem = document.createElement("div");
      resultElem.classList.add("savedTrack");
      const imgElem = document.createElement("img");
      imgElem.src = savedTrack.album.images[0].url;
      console.log(savedTrack.album.images[0].url);
      imgElem.alt = savedTrack.name;
      imgElem.width = 80;
      resultElem.appendChild(imgElem);

      const text = document.createElement("div");
      text.classList.add("savedTrack-text");
      const title = document.createElement("strong");
      title.innerText = savedTrack.name;

      const artist = document.createElement("p");
      artist.innerText = savedTrack.artists[0].name;

      text.appendChild(title);
      text.appendChild(artist);
      resultElem.appendChild(text);
      
      savedElem.appendChild(resultElem);
    });
  }
});
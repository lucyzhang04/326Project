import { getSongDB } from "./databaseFactory.js";
import { EventHub } from "./source/eventhub/EventHub.js";
import { Events } from "./source/eventhub/Events.js";
import SpotifyLogin from "./SpotifyLogin.js";
SpotifyLogin();

function loadBaseLayout() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      const navLinkEls = document.querySelectorAll(".nav__link");
      const windowPathname = window.location.pathname;

      navLinkEls.forEach((navLinkEl) => {
        if (navLinkEl.href.includes(windowPathname)) {
          navLinkEl.classList.add("active");
        }
      });
    })
    .then(() => {
      document.dispatchEvent(new CustomEvent("readyForHydration"));
    })
    .then(() => {
      const hub = EventHub.getInstance();
      hub.subscribe(Events.Reset, resetPage);
    })
    .then(() => {
      loadLiked();
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

// async function loadLiked() {
//   const st = getSongDB();
//   const liked_songs = await st.getSong();
//   console.log(liked_songs);
//   render(liked_songs);
// }

async function loadLiked() {
  const st = getSongDB();
  const liked_songs = await st.getSong();
  console.log(liked_songs);

  const playlists = await fetchUserPlaylists();
  render(liked_songs, playlists);
}

async function fetchUserPlaylists() {
  try {
    const response = await fetch("http://localhost:8888/spotify/get-user-playlists");
    if (!response.ok) throw new Error("Failed to fetch playlists");
    const playlists = await response.json();
    return playlists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
}

async function render(data, playlists) {
  let likedContElem = document.getElementById("liked-list");
  likedContElem.innerHTML = "";

  for (const likedSong of data) {
    const likedSongElem = document.createElement("div");
    likedSongElem.classList.add("trending-song");

    const songTitle = document.createElement("span");
    songTitle.classList.add("song-title");
    songTitle.textContent = likedSong.title;

    const songArtist = document.createElement("span");
    songArtist.classList.add("song-artist");
    songArtist.textContent = likedSong.artist;

    const dropdown = document.createElement("select");
    dropdown.classList.add("playlist-dropdown");
    dropdown.innerHTML = `<option value="">Select Playlist</option>`;
    playlists.forEach((playlist) => {
      const option = document.createElement("option");
      option.value = playlist.id;
      option.textContent = playlist.name;
      dropdown.appendChild(option);
    });

    const addToPlaylistBtn = document.createElement("button");
    addToPlaylistBtn.classList.add("like-btn");
    addToPlaylistBtn.textContent = "Add to Playlist";
    addToPlaylistBtn.addEventListener("click", async () => {
      const selectedPlaylistId = dropdown.value; 
      if (!selectedPlaylistId) {
        alert("Please select a playlist");
        return;
      }

      try {
        const songTitle = likedSong.title;
        const songArtist = likedSong.artist;

        const searchResponse = await fetch(
          `http://localhost:8888/spotify/search-track?title=${encodeURIComponent(songTitle)}&artist=${encodeURIComponent(songArtist)}`
        );

        if (!searchResponse.ok) {
          alert("Failed to find the song on Spotify");
          return;
        }

        const searchResult = await searchResponse.json();
        if (!searchResult.id) {
          alert("No matching song found on Spotify");
          return;
        }

        const trackId = searchResult.id;

        // Add track to selected playlist
        const addResponse = await fetch("http://localhost:8888/spotify/add-to-playlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trackId: trackId,
            playlistId: selectedPlaylistId,
          }),
        });

        if (addResponse.ok) {
          alert(`${songTitle} by ${songArtist} has been added to your playlist!`);
        } else {
          alert("Failed to add the song to the playlist.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while adding the song");
      }
    });

    likedSongElem.appendChild(songTitle);
    likedSongElem.appendChild(songArtist);
    likedSongElem.appendChild(dropdown);
    likedSongElem.appendChild(addToPlaylistBtn);
    likedContElem.appendChild(likedSongElem);
  }
}

function resetPage() {
  let likedContElem = document.getElementById("liked-list");

  while (likedContElem.firstChild) {
    likedContElem.removeChild(likedContElem.lastChild);
  }
}

loadBaseLayout();

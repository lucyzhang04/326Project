import { getSongDB } from "./databaseFactory.js";
import { EventHub } from "./source/eventhub/EventHub.js";
import { Events } from "./source/eventhub/Events.js";

function loadBaseLayout() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbarEl = document.getElementById("navbar");
      document.getElementById("navbar").innerHTML = data;

      const navLinkEls = document.querySelectorAll(".nav__link");
      const windowPathname = window.location.pathname;

      // Find and execute scripts in the fetched HTML
      const scriptTags = navbarEl.querySelectorAll("script");
      scriptTags.forEach((scriptTag) => {
        const scriptElement = document.createElement("script");
        if (scriptTag.src) {
          // If the script has a src attribute, copy it to the new script tag
          scriptElement.src = scriptTag.src;
          scriptElement.type = scriptTag.type; // Handle module type if needed
          scriptElement.defer = scriptTag.defer || false;
        } else {
          // Inline scripts: copy the content
          scriptElement.textContent = scriptTag.textContent;
        }
        document.body.appendChild(scriptElement); // Append to body to execute
      });
      navLinkEls.forEach((navLinkEl) => {
        if (navLinkEl.href.includes(windowPathname)) {
          navLinkEl.classList.add("active");
        }
      });
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

async function loadLiked() {
  const st = getSongDB();
  const liked_songs = await st.getSong();
  console.log(liked_songs);
  render(liked_songs);
}

function render(data) {
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

    likedSongElem.appendChild(songTitle);
    likedSongElem.appendChild(songArtist);
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


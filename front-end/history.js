import SpotifyLogin from "./SpotifyLogin.js";
SpotifyLogin();

function loadBaseLayout() {
  console.log("Loading base layout of history page");
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
      console.log("About to load history data");
      // loadHistory();
    })
    .then(() => {
      document.dispatchEvent(new CustomEvent("readyForHydration"));
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

// async function loadHistory() {
//     console.log("In loadHistory() function");
//     console.log(username);
//     try {
//         // Append the user_id as a query parameter
//         const url = `http://localhost:8888/history/get-history?user_id=${encodeURIComponent(username)}`;

//         const response = await fetch(url, {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         // render(data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

function render(data) {
  // let likedContElem = document.getElementById("liked-list");
  // likedContElem.innerHTML = "";
  // for(const likedSong of data){
  //     const likedSongElem = document.createElement('div');
  //     likedSongElem.classList.add("trending-song");
  //     const songTitle = document.createElement('span');
  //     songTitle.classList.add("song-title");
  //     songTitle.textContent = likedSong.title;
  //     const songArtist = document.createElement('span');
  //     songArtist.classList.add("song-artist");
  //     songArtist.textContent = likedSong.artist;
  //     likedSongElem.appendChild(songTitle);
  //     likedSongElem.appendChild(songArtist);
  //     likedContElem.appendChild(likedSongElem);
  // }
}

loadBaseLayout();


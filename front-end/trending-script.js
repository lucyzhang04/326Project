//const { DatabaseFakeService } = require("./source/services/DatabaseFakeService");
import { DatabaseFakeService } from "./source/services/DatabaseFakeService.js";
import { getSongDB } from "./databaseFactory.js";
import { EventHub } from "./source/eventhub/EventHub.js";
import { Events } from "./source/eventhub/Events.js";
import SpotifyLogin from "./SpotifyLogin.js";
//import { username } from "./SpotifyLogin.js";

//let username;

export function loadBaseLayout() {
  SpotifyLogin();

  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      /*const hub = EventHub.getInstance();
            hub.subscribe(Events.Reset, resetPage);
            hub.subscribe(Events.Username, updateUsername);*/

      document.getElementById("navbar").innerHTML = data;
      const navLinkEls = document.querySelectorAll(".nav__link");
      const windowPathname = window.location.pathname;

      navLinkEls.forEach((navLinkEl) => {
        if (navLinkEl.href.includes(windowPathname)) {
          navLinkEl.classList.add("active");
        }
      });

      //loadTrendingData();
    })
    .then(() => {
      document.dispatchEvent(new CustomEvent("readyForHydration"));
    })
    .then(() => {
      const hub = EventHub.getInstance();
      hub.subscribe(Events.Reset, resetPage);
      //hub.subscribe(Events.Username, updateUsername);
      //console.log("checkpoint 1");
    })
    .then(() => {
      //call the loadingTrendingData every 5 sec.
      loadTrendingData();

      console.log(localStorage.getItem("username"));

      setInterval(loadTrendingData, 5000);

      //loadTrendingData();
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

//using v0 for testing purposes to mock updates for trending data to mix up the data returned
//and ensure that there's updates propagated.
let v0 = true;

//calls the respective methods to load the UI for summary statistics/trending songs as well as calling the respective endpoints to determine necessary values. 
function loadTrendingData() {
  /*fetch('trendingData.json')
        .then(response => response.json())
        .then(data =>{
            render(data);
        });*/

  fetch("http://localhost:8888/trending/get-top-five")
    .then((response) => response.json())
    .then((data) => {
      console.log("data fetched");
      console.log(data.trending);

      if (data.trending.length == 0) {
        noSubs();
      } else {
        renderTrending(data.trending);
      }
    });

  fetch("http://localhost:8888/trending/get-top-contributors")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.topContributors);
      renderTopContributors(data.topContributors);
    });

  fetch("http://localhost:8888/feed/get_all_subs", {
    method: "GET",
    /*body: JSON.stringify({user_name : localStorage.getItem("username")}),
        })*/
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.submissions);
      //renderTest(data.submissions);
    });

  fetch("http://localhost:8888/trending/get-user-contributions", {
    method: "GET",
    headers: { user_name: localStorage.getItem("username") },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(
        `current user ${localStorage.getItem("username")} contributions `,
      );
      console.log(data.userTotalContributions);
      renderCurUserContributionNum(data.userTotalContributions);
    });

  fetch("http://localhost:8888/trending/get-longest-streak")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.longestStreak);
      renderLongestStreak(data.longestStreak);
    });

  fetch("http://localhost:8888/trending/get-top-artists", {
    headers: { 
      user_name: localStorage.getItem("username") 
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    renderTopArtists(data);
  });
  
}

//default screen to be shown when there are no submissions
function noSubs() {
  const text = document.createTextNode("Currently no submissions...");
  noSubWindow = document.getElementById("no-sub-screen");
  noSubWindow.appendChild(text);
  noSubWindow.classList.add("no-sub-msg");
  noSubWindow.style.display = "block";
}


async function fetchUserPlaylists() {
  try {
    const response = await fetch("http://localhost:8888/spotify/get-user-playlists");
    if (!response.ok) throw new Error("Failed to fetch playlists");
    const playlists = await response.json();
    return playlists;
  } catch (error) {
    console.error("Error fetching playlists");
    return [];
  }
}

//displays the trending songs
async function renderTrending(data) {
  const playlists = await fetchUserPlaylists();
  let trendingContElem = document.getElementById("trending-list");
  trendingContElem.innerHTML = "";

  for (const trendingItem of data) {
    const trendingElem = document.createElement("div");
    trendingElem.classList.add("trending-song");

    const songTitle = document.createElement("span");
    songTitle.classList.add("song-title");
    songTitle.textContent = trendingItem.title;

    const songArtist = document.createElement("span");
    songArtist.classList.add("song-artist");
    songArtist.textContent = trendingItem.artist;

    const songShares = document.createElement("span");
    songShares.classList.add("song-shares");
    //songShares.textContent = `${trendingItem.shares} shares`;
    songShares.textContent = `${trendingItem.frequency} shares`;

    const dropdown = document.createElement("select");
    dropdown.classList.add("playlist-dropdown");
    dropdown.innerHTML = `<option value="">Select Playlist</option>`;
    playlists.forEach((playlist) => {
      const option = document.createElement("option");
      option.value = playlist.id;
      option.textContent = playlist.name;
      dropdown.appendChild(option);
    });

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "Like";

    likeBtn.addEventListener("click", async () => {
      const st = getSongDB();
      st.addSong(trendingItem);
      alert(`${trendingItem.title} has been added to your liked items!`);
      
      // Following code is for adding the song to a playlist
      const selectedPlaylistId = dropdown.value; // Get selected playlist ID
      if (!selectedPlaylistId) {
        console.error("No playlist selected"); // debug line
      }

      try {
        const songTitle = trendingItem.title;
        const songArtist = trendingItem.artist;

        // Search for the track ID
        const searchResponse = await fetch(
          `http://localhost:8888/spotify/search-track?title=${encodeURIComponent(songTitle)}&artist=${encodeURIComponent(songArtist)}`
        );

        if (!searchResponse.ok) {
          alert("Failed to find the song on Spotify. Consider logging out and back in to refresh your Spotify session.");
          return;
        }

        const searchResult = await searchResponse.json();
        if (!searchResult.id) {
          alert("No matching song found on Spotify. Consider logging out and back in to refresh your Spotify session.");
          return;
        }

        const trackId = searchResult.id;

        // Adds the track to the selected playlist
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
          alert("Failed to add the song to the playlist :(");
        }
      } catch (error) {
        console.error(error);
        alert(error, "An error occurred while adding song");
      }
    });

    trendingElem.appendChild(songTitle);
    trendingElem.appendChild(songArtist);
    trendingElem.appendChild(songShares);
    trendingElem.appendChild(dropdown);
    trendingElem.appendChild(likeBtn);

    trendingContElem.appendChild(trendingElem);

    //whiteBackground = (whiteBackground+1) % 2;
  }
}

//for testing purposes
function renderTest(data) {
  const sumStat = document.getElementById("your-contrib-num");
  sumStat.innerHTML = "";

  const header = document.createElement("div");
  header.innerText = "Your Contributions";
  sumStat.appendChild(header);
  header.classList.add("stat-header");

  for (const contrib of data) {
    const user = document.createElement("div");
    user.classList.add("stat-line");
    const name = document.createElement("span");
    name.innerText = contrib.title + " ";
    const freq = document.createElement("span");
    freq.innerText = contrib.artist;

    //ul.appendChild(user);
    user.appendChild(name);
    user.appendChild(freq);
    sumStat.appendChild(user);
  }
}

//displays the top contributors over the past week 
function renderTopContributors(data) {
  const sumStat = document.getElementById("top-contrib");
  sumStat.innerHTML = "";

  const header = document.createElement("div");
  header.innerText = "Top Contributors";
  sumStat.appendChild(header);
  header.classList.add("stat-header");

  for (const contrib of data) {
    const user = document.createElement("div");
    user.classList.add("stat-line");
    const name = document.createElement("span");
    name.innerText = contrib.user + " ";
    const freq = document.createElement("span");
    freq.innerText = contrib.frequency + " contributions";

    sumStat.appendChild(user);
    user.appendChild(name);
    user.appendChild(freq);
  }
}

//displays the user with longest streak and the length. 
function renderLongestStreak(data) {
  const sumStat = document.getElementById("longest-streak");
  sumStat.innerHTML = "";

  const header = document.createElement("div");
  header.innerText = "Longest Streak";
  sumStat.appendChild(header);
  header.classList.add("stat-header");

  const cnt = document.createElement("div");
  cnt.innerText = data.streak;
  if (data.streak == 1) {
    cnt.innerText += " day";
  } else {
    cnt.innerText += " days";
  }
  cnt.classList.add("your-cnt");

  const user = document.createElement("div");
  user.innerText = data.userID;
  user.classList.add("user-small");

  cnt.appendChild(user);
  sumStat.appendChild(cnt);
}

function renderCurUserContributionNum(data) {
  const sumStat = document.getElementById("your-contrib-num");
  sumStat.innerHTML = "";

  const header = document.createElement("div");
  header.innerText = "Your Contributions";
  sumStat.appendChild(header);
  header.classList.add("stat-header");

  const cnt = document.createElement("div");
  cnt.innerText = data;
  cnt.classList.add("your-cnt");

  sumStat.appendChild(cnt);
}


//displays the user's top artists. 
function renderTopArtists(artists){
  const topArtists = document.getElementById("top-artists"); 
  topArtists.innerHTML = "";

  const header = document.createElement("div");
  header.innerText = "Your Top Artists";
  topArtists.appendChild(header);
  header.classList.add("stat-header");

  for (const artistEntry of artists) {
    console.log(artistEntry);
    const person = document.createElement("div");
    person.classList.add("stat-line");
    const name = document.createElement("span");
    name.innerText = artistEntry.artist + " ";
    const freq = document.createElement("span");
    freq.innerText = artistEntry.count + " submissions";

    person.appendChild(name);
    person.appendChild(freq);
    topArtists.appendChild(person);
    
  }

}

//resets the page when the 24-hr window resets and clears the entire page. 
function resetPage() {
  let trendingContElem = document.getElementById("trending-list");

  while (trendingContElem.firstChild) {
    trendingContElem.removeChild(trendingContElem.lastChild);
  }
}

//loadBaseLayout();

/*export function updateUsername(val){
    console.log("Event published. Username updated.");
    username = val;
    console.log("done");
}*/


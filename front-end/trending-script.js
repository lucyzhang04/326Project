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

function noSubs() {
  const text = document.createTextNode("Currently no submissions...");
  noSubWindow = document.getElementById("no-sub-screen");
  noSubWindow.appendChild(text);
  noSubWindow.classList.add("no-sub-msg");
  noSubWindow.style.display = "block";
}

function renderTrending(data) {
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

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "Like";

    likeBtn.addEventListener("click", () => {
      const st = getSongDB();
      st.addSong(trendingItem);
      alert(`${trendingItem.title} has been added to your liked items!`);
    });

    trendingElem.appendChild(songTitle);
    trendingElem.appendChild(songArtist);
    trendingElem.appendChild(songShares);
    trendingElem.appendChild(likeBtn);

    trendingContElem.appendChild(trendingElem);

    //whiteBackground = (whiteBackground+1) % 2;
  }
}

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

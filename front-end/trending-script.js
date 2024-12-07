//const { DatabaseFakeService } = require("./source/services/DatabaseFakeService");
import { DatabaseFakeService } from "./source/services/DatabaseFakeService.js";
import { getSongDB } from "./databaseFactory.js";
import { EventHub } from "./source/eventhub/EventHub.js";
import { Events } from "./source/eventhub/Events.js";

<<<<<<< HEAD
function loadBaseLayout() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbarEl = document.getElementById("navbar");
      navbarEl.innerHTML = data;
||||||| 86d2b1a
function loadBaseLayout(){
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
                
            const navLinkEls = document.querySelectorAll('.nav__link');
            const windowPathname = window.location.pathname;
=======
//import { username } from "./SpotifyLogin.js";

//let username;

export function loadBaseLayout(){
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {

            /*const hub = EventHub.getInstance();
            hub.subscribe(Events.Reset, resetPage);
            hub.subscribe(Events.Username, updateUsername);*/
            
            document.getElementById('navbar').innerHTML = data;
                
            const navLinkEls = document.querySelectorAll('.nav__link');
            const windowPathname = window.location.pathname;
>>>>>>> 58882977a5263453951abf7ba4bde73f74f7b662

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

      // Add active class logic after scripts are executed
      const navLinkEls = navbarEl.querySelectorAll(".nav__link");
      const windowPathname = windowPathname
        .replace(/^\//, "")
        .replace(/\.html$/, "");

<<<<<<< HEAD
      navLinkEls.forEach((navLinkEl) => {
        console.log(windowPathname);
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
      //call the loadingTrendingData every 5 sec.
      loadTrendingData();
      setInterval(loadTrendingData, 5000);

      //loadTrendingData();
    })
    .catch((error) => console.error("Error loading navbar:", error));
||||||| 86d2b1a
        })
        .then(() => {
            const hub = EventHub.getInstance();
            hub.subscribe(Events.Reset, resetPage);
        })
        .then(() => {
            //call the loadingTrendingData every 5 sec.
            loadTrendingData();
            setInterval(loadTrendingData, 5000);
            
            //loadTrendingData();
        })
        .catch(error => console.error('Error loading navbar:', error));
=======
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
        .catch(error => console.error('Error loading navbar:', error));
>>>>>>> 58882977a5263453951abf7ba4bde73f74f7b662
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

<<<<<<< HEAD
  let d = new DatabaseFakeService();
||||||| 86d2b1a
    let d = new DatabaseFakeService();
=======
    fetch('http://localhost:8888/trending/get-top-five')
        .then(response => response.json())
        .then(data => {
            console.log("data fetched");
            console.log(data.trending);
            render(data.trending);
        });

    /*let d = new DatabaseFakeService();
>>>>>>> 58882977a5263453951abf7ba4bde73f74f7b662

  if (v0) {
    v0 = false;
  } else {
    v0 = true;
  }

<<<<<<< HEAD
  d.getTopFive(v0).then((data) => render(data));
||||||| 86d2b1a
    d.getTopFive(v0)
        .then(data => render(data));
=======
    d.getTopFive(v0)
        .then(data => render(data));*/
>>>>>>> 58882977a5263453951abf7ba4bde73f74f7b662
}

function render(data) {
  let trendingContElem = document.getElementById("trending-list");
  trendingContElem.innerHTML = "";

  //let whiteBackground = 0;
  for (const trendingItem of data) {
    const trendingElem = document.createElement("div");
    trendingElem.classList.add("trending-song");
    /*let color = "gray";
        if(whiteBackground){
            color = "white";
        }
        trendingElem.style.backgroundColor = color;*/

    /*const songInfo = document.createElement('p');
        songInfo.classList.add('song-info');
        songInfo.textContent = `${trendingItem.id}.  ${trendingItem.title}    ---    ${trendingItem.artist}   (${trendingItem.shares} shares)`;
        
        trendingElem.appendChild(songInfo);*/

    const songTitle = document.createElement("span");
    songTitle.classList.add("song-title");
    songTitle.textContent = trendingItem.title;

    const songArtist = document.createElement("span");
    songArtist.classList.add("song-artist");
    songArtist.textContent = trendingItem.artist;

<<<<<<< HEAD
    const songShares = document.createElement("span");
    songShares.classList.add("song-shares");
    songShares.textContent = `${trendingItem.shares} shares`;
||||||| 86d2b1a
        const songShares = document.createElement('span');
        songShares.classList.add("song-shares");
        songShares.textContent = `${trendingItem.shares} shares`;
=======
        const songShares = document.createElement('span');
        songShares.classList.add("song-shares");
        //songShares.textContent = `${trendingItem.shares} shares`;
        songShares.textContent = `${trendingItem.frequency} shares`;
>>>>>>> 58882977a5263453951abf7ba4bde73f74f7b662

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



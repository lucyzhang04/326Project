import { DatabaseFakeService } from "./source/services/DatabaseFakeService.js";
import { getSongDB } from "./databaseFactory.js";
import { EventHub } from "./source/eventhub/EventHub.js";
import { Events } from "./source/eventhub/Events.js";

const grid = document.getElementById("widget-grid");
const noSubWindow = document.getElementById("no-sub-screen");
let reset = false;
let dataSet = true;
let idCount = 0;

const buildWidget = (submission) => {
  submission["id"] = idCount++;

  const widget = document.createElement("div");
  const infoContainer = document.createElement("div");
  const infoList = document.createElement("ul");
  const img = document.createElement("img");

  const heartButton = document.createElement("button");
  const plus = document.createTextNode("+");
  const nameText = document.createElement("li");
  const hostText = document.createElement("li");

  //filling out text Nodes and image info
  /**
     * nameText.innerText = submission["name"];
        hostText.innerText = submission["host"];
        img.src = submission["image"];
     * 
     */
  if(submission["title"].length >= 22){
    nameText.innerText = submission["title"].substring(0,22) + "...";
  }
  else nameText.innerText = submission["title"];
  //nameText.innerText = submission["title"];
  if(submission["artist"].length > 15){
    hostText.innerText = submission["artist"].substring(0,17) + "...";
  }
  else hostText.innerText = submission["artist"];
  if (!submission["imageURL"] || submission["image"] === "fake link") {
    img.src = "https://ichef.bbci.co.uk/images/ic/1424x801/p0d0mjrz.jpg.webp";
  } else img.src = submission["imageURL"];

  //adding classes
  nameText.classList.add("name-element");
  hostText.classList.add("host-element");
  img.classList.add("img-square");
  infoList.classList.add("info-list");
  infoContainer.classList.add("info-container");
  widget.classList.add("widget");
  heartButton.classList.add("heart-button");

  //adding event listener
  heartButton.addEventListener("click", async () => {
    getSongDB()
      .addSong({
        id: idCount,
        title: submission["title"],
        artist: submission["artist"],
      })
      .then((response) => {
        //alert(`${nameText.innerText} has been saved to liked songs!`);
        alert(`${submission["title"]} has been saved to liked songs!`);
        console.log("Success");
      })
      .catch((error) => {
        alert(`You've already saved ${submission["title"]}!`);
        console.log(`Errors: ${error}`);
      });
  });
  //appending children
  heartButton.appendChild(plus);
  infoList.appendChild(nameText);
  infoList.appendChild(hostText);
  infoContainer.appendChild(infoList);
  infoContainer.appendChild(heartButton);
  widget.appendChild(img);
  widget.appendChild(infoContainer);
  grid.appendChild(widget);
};

const noSubs = () => {
  const text = document.createTextNode("Currently no submissions...");
  noSubWindow.appendChild(text);
  noSubWindow.classList.add("no-sub-msg");
  noSubWindow.style.display = "block";
};

const clearSubs = () => {
  grid.innerHTML = "";
};

const render = () => {
  /*
    const db = new DatabaseFakeService();
    db.getSubmissions(dataSet).then(submissions => submissions.forEach(sub => buildWidget(sub))).catch(error => {
        console.log(error);
        alert("There was an error fetching submissions -- please try again later!");
    }); 
    */

  //fetching today's subs from backend
  fetch("http://localhost:8888/feed/get_today_subs")
    .then(async (data) => {
      console.log(data);
      return data.ok
        ? await data.json()
        : Promise.reject("There was an error fetching submissions.");
    })
    .then((data) => {
      //console.log(data);
      const submissions = data.submissions;
      console.log(submissions);
      if (data.length === 0) {
        //console.log("here in correct block");
        //no submissions --> display no submission popup to user
        reset = false;
        noSubs();
      } else {
        //else --> hide no submission message, and render each submission.
        noSubWindow.style.display = "none";
        data.forEach((sub) => buildWidget(sub));
      }
    })
    .catch((error) => {
      //error handling
      console.log(error);
      alert(
        "There was an error fetching submissions -- please try again later!",
      );
    });
};
render();
/*
if(!reset){
    noSubWindow.style.display = "none";
    render();
    dataSet = false;
    /*
    setInterval(() => {
        render();
    }, 4000);
    
    
}
else{
    noSubWindow.style.display = "block";
    reset = false; 
    noSubs(); 
}
*/
const hub = EventHub.getInstance();
hub.subscribe(Events.Reset, (data) => {
  reset = true;
  clearSubs();
});

//console.log("executing");

//opening socket for live connection
const socket = new WebSocket("ws://localhost:9000");
socket.onopen = (event) => {
  console.log("Socket has successfully opened");
};
socket.onmessage = (message) => {
  //socket will only ever receive submissions.
  console.log("Its working!");
  //hiding no submission window, since a submission has been received
  noSubWindow.style.display = "none";
  //parsing message for data
  const newSub = JSON.parse(message.data);
  //console.log(newSub);
  //build the new submission and render it on screen
  buildWidget(newSub);
};

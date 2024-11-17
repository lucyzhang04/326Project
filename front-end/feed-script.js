
import { DatabaseFakeService } from "./source/services/DatabaseFakeService.js";
import { getSongDB } from "./databaseFactory.js";
import { EventHub } from "./source/eventhub/EventHub.js";
import { Events } from "./source/eventhub/Events.js";

const grid = document.getElementById("widget-grid"); 
let reset = false; 
let idCount = 0; 
/*
const getSubmissions = async () => {
    return mock_fetch("http://127.0.0.1:5500/front-end/feed.html")
    .then(response => response.ok ? response.json() : Promise.reject("Could not retrieve submission correctly"))
    .then(submissions => {
        submissions.forEach(sub => buildWidget(sub))
    })
    .catch(error => {
        alert("There was an error fetching submissions -- please try again later!");
    }); 
}
*/



const buildWidget = (submission) => {

    submission["id"] = idCount++;

    const widget = document.createElement("div"); 
    const infoContainer = document.createElement("div"); 
    const infoList = document.createElement("ul");
    const img = document.createElement("img"); 

    const heartButton = document.createElement("button");
    const plus =  document.createTextNode("+");
    const nameText = document.createElement("li");
    const hostText = document.createElement("li");

    
    //filling out text Nodes and image info
    nameText.innerText = submission["name"];
    hostText.innerText = submission["host"];
    img.src = submission["image"];;

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
        
        getSongDB().addSong(submission).then(response =>{ 
            alert(`${nameText.innerText} has been saved to liked songs!`);
            console.log("Success");
        })
        .catch(error => {
            alert(`There was an issue adding ${nameText.innerText} to your saved songs -- please try again later!`);
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

}

const noSubs = () => {
    const msg = document.createElement("div"); 
    msg.classList.add("no-sub-msg");
    const text = document.createTextNode("Currently no submissions..."); 
    msg.appendChild(text); 
}


const clearSubs = () => {
    grid.innerHTML = "";
}

const render = () => {
    const db = new DatabaseFakeService();
    db.getSubmissions().then(submissions => submissions.forEach(sub => buildWidget(sub))).catch(error => {
        console.log(error);
        alert("There was an error fetching submissions -- please try again later!");
    }); 
}

if(!reset){
    render();
}
else{
    reset = false; 
    noSubs(); 
}
const hub = EventHub.getInstance(); 
hub.subscribe(Events.Reset, (data) => {
    reset = true; 
    clearSubs();
});



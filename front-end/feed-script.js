
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
        
        getSongDB().addSong({
                id:idCount, 
                "title": submission["name"],
                "artist": submission["host"],
            }).then(response =>{ 
            alert(`${nameText.innerText} has been saved to liked songs!`);
            console.log("Success");
        })
        .catch(error => {
            alert(`You've already saved that song!`);
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
    const text = document.createTextNode("Currently no submissions..."); 
    noSubWindow.appendChild(text); 
}


const clearSubs = () => {
    grid.innerHTML = "";
}

const render = () => {
    const db = new DatabaseFakeService();
    db.getSubmissions(dataSet).then(submissions => submissions.forEach(sub => buildWidget(sub))).catch(error => {
        console.log(error);
        alert("There was an error fetching submissions -- please try again later!");
    }); 
}

if(!reset){
    noSubWindow.style.display = "none";
    render();
    dataSet = false;
    setInterval(() => {
        render();
    }, 4000);
    
}
else{
    noSubWindow.style.display = "block";
    reset = false; 
    noSubs(); 
}
const hub = EventHub.getInstance(); 
hub.subscribe(Events.Reset, (data) => {
    reset = true; 
    clearSubs();
});



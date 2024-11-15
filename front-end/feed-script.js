
import { DatabaseFakeService } from "./source/services/DatabaseFakeService.js";

const grid = document.getElementById("widget-grid"); 
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
    heartButton.addEventListener("click", () => alert(`${nameText.innerText} has been saved to liked songs!`));
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

const render = () => {
    const db = new DatabaseFakeService();
    db.getSubmissions().then(submissions => submissions.forEach(sub => buildWidget(sub))).catch(error => {
        alert("There was an error fetching submissions -- please try again later!");
    }); 
}

render();


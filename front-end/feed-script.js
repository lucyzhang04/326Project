




const getSubmissions = async () => {
    //write a fetch of some sort, should give image, name, and host FROM THE DB (not spotify query)
    return fetch("fake url").then(response => response.ok() ? response.json() : Promise.reject("Could not retrieve submission correctly")).catch(error => {error: "Could not retrieve submission correctly"}); 
}

const submissions = [
    { 
        "name": "Cotton-Eyed Joe\n",
        "host" : "Jane Doe\n",
        "image": "This is a mock response", 
    }, 
    { 
        "name": "Podcast 2\n",
        "host" : "John Deere\n",
        "image": "This is a mock response", 
    },
    { 
        "name": "How to Save the Planet\n",
        "host" : "Jane Doe\n",
        "image": "This is a mock response", 
    },
    { 
        "name": "Podcast 1\n",
        "host" : "wfjwoejgwejgioerigoergjorigj\n",
        "image": "This is a mock response", 
    }

]; 
//building basic screen layout 

let N = 7; 
let M =7; 

const build = () => {
    const columns = N; 
    const rows = M; 
    let idx = 0; 
    //this needs to become for each submission
    const grid = document.getElementById("widget-grid"); 
    for(let x = 0; x < rows; x++){
        for(let y = 0; y < columns; y++){
            if(idx == submissions.length) continue;
            const widget = document.createElement("div"); 
            const infoContainer = document.createElement("div"); 
            const infoList = document.createElement("ul");

            const heartButton = document.createElement("button");
            const plus =  document.createTextNode("+");
            const nameText = document.createElement("li");
            const hostText = document.createElement("li");
            
            nameText.innerText = submissions[idx]["name"];
            hostText.innerText = submissions[idx]["host"];

            nameText.classList.add("list-element");
            hostText.classList.add("list-element");
            infoList.classList.add("info-list");
            infoContainer.classList.add("info-container");
            widget.classList.add("widget"); 
            heartButton.classList.add("heart-button");

            heartButton.appendChild(plus); 
            infoList.appendChild(nameText); 
            infoList.appendChild(hostText); 
            infoContainer.appendChild(infoList); 
            infoContainer.appendChild(heartButton)
            widget.appendChild(infoContainer); 
            grid.appendChild(widget); 
            ++idx;
        }
    }
    return; 
}

//assumptions -- submissions will be returned as an array of objects. 



build(); 
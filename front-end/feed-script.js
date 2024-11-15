




const getSubmissions = async () => {
    //write a fetch of some sort, should give image, name, and host FROM THE DB (not spotify query)
    return fetch("fake url").then(response => response.ok() ? response.json() : Promise.reject("Could not retrieve submission correctly")).catch(error => {error: "Could not retrieve submission correctly"}); 
}

const submissions = [
    { 
        "name": "The Rest is History",
        "host" : "Jane Doe\n",
        "image": "https://ichef.bbci.co.uk/images/ic/1424x801/p0d0mjrz.jpg.webp", 
    }, 
    { 
        "name": "The Daily",
        "host" : "New York Times",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04154511/Free-Stock-Photos-06.jpg"
    },
    { 
        "name": "How to Save the Planet",
        "host" : "Jane Doe",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg", 
    },
    { 
        "name": "Podcast 1\n",
        "host" : "Jack & Jill",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04160429/Free-Stock-Photos-07.jpg", 
    },
    { 
        "name": "How to Save the Planet",
        "host" : "Jane Doe",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg", 
    },
    { 
        "name": "The Rest is History",
        "host" : "Jane Doe\n",
        "image": "https://ichef.bbci.co.uk/images/ic/1424x801/p0d0mjrz.jpg.webp", 
    }, 
    { 
        "name": "The Daily",
        "host" : "New York Times",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04154511/Free-Stock-Photos-06.jpg"
    },
    { 
        "name": "How to Save the Planet",
        "host" : "Jane Doe",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg", 
    },
    { 
        "name": "Podcast 1\n",
        "host" : "Jack & Jill",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04160429/Free-Stock-Photos-07.jpg", 
    },
    { 
        "name": "The Daily",
        "host" : "New York Times",
        "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04154511/Free-Stock-Photos-06.jpg"
    },



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
            //creating elements 
            const widget = document.createElement("div"); 
            const infoContainer = document.createElement("div"); 
            const infoList = document.createElement("ul");
            const img = document.createElement("img"); 

            const heartButton = document.createElement("button");
            const plus =  document.createTextNode("+");
            const nameText = document.createElement("li");
            const hostText = document.createElement("li");

            
            //filling out text Nodes and image info
            nameText.innerText = submissions[idx]["name"];
            hostText.innerText = submissions[idx]["host"];
            img.src = submissions[idx]["image"];;

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
            ++idx;
        }
    }
    return; 
}

//assumptions -- submissions will be returned as an array of objects. 



build(); 
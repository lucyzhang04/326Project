let N = 10; 
let M =10; 

const build = () => {
    const columns = N; 
    const rows = M; 
    const grid = document.getElementById("widget-grid"); 
    for(let x = 0; x < rows; x++){
        for(let y = 0; y < columns; y++){
            const widget = document.createElement("div"); 
            const heartButton = document.createElement("button");
            const plus =  document.createTextNode("+");

            widget.classList.add("widget"); 
            heartButton.classList.add("heart-button");

            heartButton.appendChild(plus); 
            widget.appendChild(heartButton); 
            grid.appendChild(widget); 
        }
    }
    return; 
}

build(); 
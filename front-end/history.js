function loadBaseLayout(){
    console.log("Loading base layout of history page");
    fetch('navbar.html')
          .then(response => response.text())
          .then(data => {
            document.getElementById('navbar').innerHTML = data;
            
            const navLinkEls = document.querySelectorAll('.nav__link');
            const windowPathname = window.location.pathname;

            navLinkEls.forEach(navLinkEl => {
                if (navLinkEl.href.includes(windowPathname)) {
                    navLinkEl.classList.add('active');
                }
            })
          })
          .then(() => {
            console.log("About to load history data");
            loadHistory();
          })
          .catch(error => console.error('Error loading navbar:', error));
}

async function loadHistory() {
  console.log("In loadHistory() function");
  let username = localStorage.getItem("username");
  console.log(username)
  try {
      // Append the user_id as a query parameter
      const url = `http://localhost:8888/history/get-history?user_name=${encodeURIComponent(username)}`;
      
      const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      console.log(data["yourSubmissions"])
      render(data["yourSubmissions"]);
  } catch (error) {
      console.log(error.message);
  }
}


function render(data){

    let histElem = document.getElementById("history-list");
    histElem.innerHTML = "";

    for(const song of data){
        const songElem = document.createElement('div');
        songElem.classList.add("trending-song");

        const songTitle = document.createElement('span');
        songTitle.classList.add("song-title");
        songTitle.textContent = song.title;

        const songArtist = document.createElement('span');
        songArtist.classList.add("song-artist");
        songArtist.textContent = song.artist;

        songElem.appendChild(songTitle);
        songElem.appendChild(songArtist);
        histElem.appendChild(songElem);
    }

}

loadBaseLayout();
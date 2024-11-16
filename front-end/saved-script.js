import { getSongDB } from "./databaseFactory.js";

function loadBaseLayout(){
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
            });

            loadLiked();

          })
          .catch(error => console.error('Error loading navbar:', error));
}

async function loadLiked(){
    const st = getSongDB();
    const liked_songs = await st.getSong();
    console.log(liked_songs);
    render(liked_songs);
}

function render(data){
    let likedContElem = document.getElementById("trending-list");
    likedContElem.innerHTML = "";

    for(const likedSong of data){
        const likedSongElem = document.createElement('div');
        likedSongElem.classList.add("trending-song");

        const songTitle = document.createElement('span');
        songTitle.classList.add("song-title");
        songTitle.textContent = likedSong.title;

        const songArtist = document.createElement('span');
        songArtist.classList.add("song-artist");
        songArtist.textContent = likedSong.artist;

        const songShares = document.createElement('span');
        songShares.classList.add("song-shares");
        songShares.textContent = `${likedSong.shares} shares`;

        likedSongElem.appendChild(songTitle);
        likedSongElem.appendChild(songArtist);
        likedSongElem.appendChild(songShares);

        likedContElem.appendChild(likedSongElem);
    }

}

loadBaseLayout();
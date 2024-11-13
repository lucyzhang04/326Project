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

            loadTrendingData();

        })
        .catch(error => console.error('Error loading navbar:', error));
}


function loadTrendingData(){
    fetch('trendingData.json')
        .then(response => response.json())
        .then(data =>{
            render(data);
        });
}

function render(data){
    let trendingContElem = document.getElementById("trending-list");
    trendingContElem.innerHTML = "";
    
    //let whiteBackground = 0;
    for(const trendingItem of data){
        const trendingElem = document.createElement('div');
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

        const songTitle = document.createElement('span');
        songTitle.classList.add("song-title");
        songTitle.textContent = trendingItem.title;

        const songArtist = document.createElement('span');
        songArtist.classList.add("song-artist");
        songArtist.textContent = trendingItem.artist;

        const songShares = document.createElement('span');
        songShares.classList.add("song-shares");
        songShares.textContent = `${trendingItem.shares} shares`;

        const likeBtn = document.createElement('button');
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "Like";

        trendingElem.appendChild(songTitle);
        trendingElem.appendChild(songArtist);
        trendingElem.appendChild(songShares);
        trendingElem.appendChild(likeBtn);

        trendingContElem.appendChild(trendingElem);

        //whiteBackground = (whiteBackground+1) % 2;
    }
}

loadBaseLayout();

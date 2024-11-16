import { getSongDB } from "./databaseFactory";

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

function loadLiked(){
    const st = getSongDB();
    st.getSong()

}
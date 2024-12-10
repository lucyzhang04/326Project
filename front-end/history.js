import SpotifyLogin from "./SpotifyLogin.js";
SpotifyLogin();

function loadBaseLayout() {
  console.log("Loading base layout of history page");
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      const navLinkEls = document.querySelectorAll(".nav__link");
      const windowPathname = window.location.pathname;

      navLinkEls.forEach((navLinkEl) => {
        if (navLinkEl.href.includes(windowPathname)) {
          navLinkEl.classList.add("active");
        }
      });
    })
    .then(() => {
      document.dispatchEvent(new CustomEvent("readyForHydration"));
    })
    .then(() => {
      console.log("About to load history data");
      loadHistory();
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

//This function invokes two routes: the first route it invokes is /history/get-history, which gets all submissions associated with
//a particular username. The second route extracts the submission date from each submission and finds the quote for that particular submission
//date by invoking the /api/quotes/quote-by-date endpoint. It sends an array of objects to the render function, where each object consists of 
//a retrived submission along with the retrieved quote for that date.
async function loadHistory() {
  console.log("In loadHistory() function");
  let username = localStorage.getItem("username");
  console.log(username);
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
    console.log(data["yourSubmissions"]);

    // For each submission, fetch the quote by date
    const submissionsWithQuotes = await Promise.all(
      data["yourSubmissions"].map(async (submission) => {
        const date = new Date(submission.submissiondate);
        const quoteUrl = `http://localhost:8888/api/quotes/quote-by-date?date=${encodeURIComponent(date.toISOString())}`;

        try {
          const quoteResponse = await fetch(quoteUrl, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (quoteResponse.ok) {
            const quoteData = await quoteResponse.json();
            submission.quote = quoteData.quote;
            submission.person = quoteData.person;
          } else {
            submission.quote = "No quote found for this date";
            submission.person = "Unknown";
          }
        } catch (quoteError) {
          console.log("Error fetching quote:", quoteError);
          submission.quote = "Error fetching quote";
          submission.person = "Unknown";
        }
        return submission;
      }),
    );

    console.log(submissionsWithQuotes);

    render(submissionsWithQuotes);
    //   render(data["yourSubmissions"]);
  } catch (error) {
    console.log(error.message);
  }
}

//This implements the table in the frontend that displays each past submission (title and artist) along with its associated quote.
//It's invoked in loadHistory.
function render(data) {
  let histElem = document.getElementById("history-list");
  histElem.innerHTML = "";

  for (const song of data) {
    const songElem = document.createElement("div");
    songElem.classList.add("trending-song");

    const songTitle = document.createElement("span");
    songTitle.classList.add("song-title");
    songTitle.textContent = song.title;

    const songArtist = document.createElement("span");
    songArtist.classList.add("song-artist");
    songArtist.textContent = song.artist;

    const songQuote = document.createElement("span");
    songQuote.classList.add("song-artist");
    songQuote.textContent = song.quote;

    songElem.appendChild(songTitle);
    songElem.appendChild(songArtist);
    songElem.appendChild(songQuote);
    histElem.appendChild(songElem);
  }
}

loadBaseLayout();

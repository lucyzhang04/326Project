# Contribution Log for Elijah Sippel

## December 8, 2024
- **Task**: Implement song submission feature
- **Details**: This was the final feature neede to set up the primary feature of the app, which was the song submission form. Song search was already working, but I implemented the code to take the selected song and send it to our REST API and save the submissino in the DB. I also fixed some small issues in the history page to ensure that past submissions showed up there.
- **Link to commit**: [implement song submission](https://github.com/lucyzhang04/326Project/commit/50c00a71bef181a6cdf08ffd7a00c6f08aebf075)

## December 8, 2024
- **Task**: Connect all login features to frontend.
- **Details**: This was a pain to set up, but my main task for this day was getting authentication fully functional on the frontend which was more work than setting up the DB. This involved writing the SpotifyLogin.js file that provided account data to every page in the app, and coordinated the passing of data from the DB to localStorage to save credentials in cache.
- **Link to Commit**: [checkpoint: hiding input area when logged out](https://github.com/lucyzhang04/326Project/commit/9844bf5e17d24617810c4eedbf4ed4f5c08f5246)


## December 4, 2024
- **Task**: Create Users table/controller and implement Spotify Authentication
- **Details**: Building on Marie's work in implementing the Spotify API, I added database persistence for users and also shifted from having a fixed access code to letting users log in with their Spotify account, saving their credentials to the DB.
- **Link to Commit**: [implement Users table, populate when user logs in with Spotify](https://github.com/lucyzhang04/326Project/commit/99d5f8f0ebfe1afb6620e936b8ab902b8d658da1)

## November 16, 2024

- **Task**: Resolve a slew of merge conflicts!
- **Details**: Had a ton of merge conflicts to resolve after the team had been working on different parts of the project. It took a while to sort through them all, but I managed to get everything working again.
- **Link to Commit**: [resolve merge conflicts](https://github.com/lucyzhang04/326Project/commit/7e07403bd48859641f5777a1566f49d1b2cfd317)

## November 15, 2024

- **Task**: Add UI for song search and display results.
- **Details**: Implemented the UI for searching for songs and displaying the results. This involved creating the search bar and displaying the results in a list and styling the results.
- **Link to Commit**: [add UI for song search](https://github.com/lucyzhang04/326Project/commit/e85b4b0fcf4cf1a83f25a81d6ce940268c713aed)

## November 7, 2024

- **Task**: Used tasks-v3 to mock the Spotify API interactions.
- **Details**: I created a mock API server using tasks-v3 to simulate the Spotify API. This allowed us to test our application without needing to interact with the actual Spotify API.
- **Link to Commit**: [install http-server; add start script](https://github.com/lucyzhang04/326Project/commit/27567477859fa70011f74284fb29b8943c3608d1)

## October 18, 2024

- **Task**: Drafted the first version of the `data.md` file.
- **Details**: Did some research on the Spotify API to understand the structure
  of the data we would need to implement the features we had planned in
  brainstorming, and wrote an initial draft summary of the relationships
  between the data.
- **Link to Commit**: [Initial Commit](https://github.com/lucyzhang04/326Project/commit/f5aecdb38a0f25b50722f764cbb87b11d29f1976)


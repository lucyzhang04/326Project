## Contribution Log for Mai Chi Le

### October 18, 2024
- **Task**: Set up users.md and made appropriate changes, completed first draft
- **Details**: Completed first draft of intended audiance of the app and added it to users.md. Will continue to monitor problem.md and update intended audiance appropriately
- **Link to Commit**: [Commit on users.md](https://github.com/lucyzhang04/326Project/commit/dab73481ae91a9e9e54e9ce149338812e51c980e)

---

### October 21, 2024
- **Task**: Reviewed problem.md, ui-diagrms.md, users.md, and roles.md to ensure correctness
- **Details**: Made sure the reviewd files were correct and matching with Milestone 2 prompt. Replaced FirstScreenPrompt.png with a corrected image without a large border to ensure aesthetic correctness
- **Link to Commit**: [Commit on ui-images](https://github.com/lucyzhang04/326Project/commit/ab89fade07d1cda659e2cb59c90f17506eebde5c)

---

### Nov 14 and 15, 2024
- **Task**: Created and Implemented Login Pop-Up UI
- **Details**: Implemeted a login UI feature with a Login button that would trigger a pop up with slow zoom animation to a login page with username and password fields and a submit button
- **Link to Commit**: [Commit on index.html, styles.css](https://github.com/lucyzhang04/326Project/commit/6fb51649858458688cf01d4e7c4a762cbec188d9)

---

### Nov 16, 2024
- **Task**: Polished Login UI and Implemented Mock Login Authentication
- **Details**: Polished login UI in index.html with styling in styles.css, implemented mock authentication using a login-data.json file to validate usernames and passwords with pop up message upon successful and/or failed authentication attempts. This feature was ultimately foregone for the final project as the Spotify API's user account authentication in Milestone 4 requires a different approach from traditional login functionality. 
- **Link to Commit**: [Commit on index.html, styles.css, login-data.json](https://github.com/lucyzhang04/326Project/commit/98892c83200668c8dd75f6b2b60218c8c7805881)

---

- **Task**: Spotify Songs to be saved in local array storage
- **Details**: User selection of a spotify song from Results box tracked in real-time within a dynamically updated array, forming the groundwork for backend integration in milestone 4. 
- **Link to Commit**: [Commit on index.html, search-song.js](https://github.com/lucyzhang04/326Project/commit/d31114176d8768a45f2ce50e8c61cf3227eae461)

---

- **Task**: Implemented UI for Selected songs from Results Box
- **Details**: When users click and select song(s) from the Results box, the song(s) are highlighted blue for clarity and when the song is unselected, the highlight is deleted. 
- **Link to Commit**: [Commit on styles.css](https://github.com/lucyzhang04/326Project/commit/66741bac5ba0a99ef522569895d4deea1151b82f)

---

- **Task**: Designed and implemented To Add box/widget UI next to Results box and logic to dynamically add selected songs
- **Details**: When users click and select song(s) from the Results box, the song(s), a "To Add" box/widget next to the Results box ensures selected songs are dynamically and visually displayed in the "To Add" box without delay and removed upon unselection in real-time leveraging responsive UI logic.
- **Link to Commit**: [Commit on index.html, search-song.js](https://github.com/lucyzhang04/326Project/commit/cee3fbf558e0e58073a7959e624061c56700e318)

---

### Nov 17, 2024
- **Task**: Implemented Submit Button below To Add for Song Submission and Redirection 
- **Details**: Before proceeding to the general feed, the submit button makes sure users have added at least one song displayed in "To Add" box. User's selections upon submission are dynamically validated, blocking navigation if no songs are selected. Users are seamlessly redirected to the feed screen, where they may see other people's contributions, after submission is complete.
- **Link to Commit**: [Commit on index.html, styles.css, search-song.js](https://github.com/lucyzhang04/326Project/commit/ff36b9b492b24c50c2c0b33517a084a419a4bf02)

---

### December 7, 2024
- **Task**: Added Scopes to Make Sure User Grants Necessary Permissions to Read User Playlists & Add Song to User Playlist
- **Details**: Before the implementation of adding a song/track to a playlist, necessary scopes are added to make sure the user allows proper authorization to the app so that songs from the app can be added to the user's Spotify playlist and their Spotify playlists can be read.
- **Link to Commit**: [Issue on spotify-routes.js](https://github.com/lucyzhang04/326Project/issues/141)

---

### December 8 - 9, 2024
- **Task**: Implemented Spotify API endpoints to fetch, search, and update playlist data & tracks
- **Details**: Implemented a backend endpoint "/get-user-playlists", which retrieves user's playlists from Spotify using Spotify API and filtered the data to return playlist IDs and names. Implemented a search endpoint "/search-track" to extract song's track ID based on song artist and name. Implemented an endpoint "/add-to-playlist" to add a chosen song/track to a chosen playlist by sending a POST request to Spotify's API with the track ID and playlist ID. Ensured good error handling as a good practice. 
- **Link to Commit**: [Commit on spotify-routes.js](https://github.com/lucyzhang04/326Project/pull/151/commits/421e5fb0ed1082bd0d7cc9508c8039fa165d7563)

---

- **Task**: Implemented Dropdown UI and Integrated with Spotify API Endpoints on the Trending Page to Add Chosen Song to User's Chosen Spotify Playlist
- **Details**: Implemented a dropdown UI for playlist selection and integrated it with backend Spotify API endpoints for fetching user's playlists and adding tracks to user's Spotify account. Updated the front-end/saved-script.js to dynamically populate the dropdown menu with user's Spotify playlists based on data retrieved from "/get-user-playlists". Made overall functionality for user to select a playlist from the dropdown menu and add the songs/tracks to chosen Spotify playlist through clicking on the "Like" button next to the song (which also adds the song to "Saved" page).
- **Link to Commit**: [Commit on trending-script.js, styles.css](https://github.com/lucyzhang04/326Project/pull/151/commits/2d3a71fc77b094f9c8fb441729265f2303bc8a96)

---

### December 10, 2024
- **Task**: Moved "Add Chosen Song to User's Chosen Spotify Playlist" feature to "Saved" page Improving UX
- **Details**: Added the functionality of adding a chosen song/track in the "Saved" page to a user's chosen Spotify playlist after clicking "Add to Playlist" based on the functionality mentioned above since adding songs to playlists from the saved page was more intuitive and improved UX.
- **Link to Commit**: [Commit on saved-script.js](https://github.com/lucyzhang04/326Project/pull/157/commits/7af666c211a51ab0f0172c29b3a123567300bbe5)

---

- **Task**: Reverted changes in trending-scrips.js Removing Spotify-Song-Adding Functionality 
- **Details**: Removed the implementation of user being able to add songs/tracks to user's chosen Spotify playlist based on dropdown playlist selection on Trending page due to the unintuitive UI/UX. 
- **Link to Commit**: [Commit on trending-script.js](https://github.com/lucyzhang04/326Project/pull/159/commits/cdd2df8bf104d95d8c6a4c67df08f79abc68bab9)

---

- **Task**: Addressed a Small Bug That Prevented user from Adding Multiple Songs to the Feed 
- **Details**: Addressed a small bug in search-song.js in the "submit" event listener to allow multiple songs to be added to the feed instead of just the first selected song. 
- **Link to Commit**: [Commit on search-song.js](https://github.com/lucyzhang04/326Project/pull/161/commits/99417bd1f8013451cb0e483f90e299f5392b45e4)

---

- **Task**: Added Comments To All Implemented features 
- **Details**: Added comments to the features I implemented for Milestone 4, specifically in spotify-routes.js and saved-script.js.
- **Link to Commit**: [Commit on spotify-routes.js, saved-script.js](https://github.com/lucyzhang04/326Project/pull/172/commits/38673fe687ff0baa6b70e2a944043eb62812f5f1)

---

- **Task**: Edited scopes to follow the least privilege principle 
- **Details**: Removed unnecessary Spotify API scopes to adhere to the principle of least privilege in spotify-routes.js and tested the endpoints to ensure all required functionalities still work seamlessly with the revised scope list.
- **Link to Commit**: [Commit on spotify-routes.js](https://github.com/lucyzhang04/326Project/commit/b47f3b12c54ad99eea485c8b206c3ac5cfbcce61)

---

- **Task**: Added video to Demo folder 
- **Details**: Added the demo video to the "Demo" folder and made sure the video adheres to the requirements of MS4.
- **Link to Commit**: [Commit on Demo](https://github.com/lucyzhang04/326Project/commit/7e23776398f9376e83db937ad8d91c69f61ba2d1)
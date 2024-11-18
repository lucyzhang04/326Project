## Contribution Log for Mai Chi Le

### October 18, 2024
- **Task**: Set up users.md and made appropriate changes, completed first draft
- **Details**: Completed first draft of intended audiance of the app and added it to users.md. Will continue to monitor problem.md and update intended audiance appropriately
- **Link to Commit**: [Commit on users.md](https://github.com/lucyzhang04/326Project/commit/dab73481ae91a9e9e54e9ce149338812e51c980e)

### October 21, 2024
- **Task**: Reviewed problem.md, ui-diagrms.md, users.md, and roles.md to ensure correctness
- **Details**: Made sure the reviewd files were correct and matching with Milestone 2 prompt. Replaced FirstScreenPrompt.png with a corrected image without a large border to ensure aesthetic correctness
- **Link to Commit**: [Commit on ui-images](https://github.com/lucyzhang04/326Project/commit/ab89fade07d1cda659e2cb59c90f17506eebde5c)

### Nov 14 and 15, 2024
- **Task**: Created and Implemented Login Pop-Uo UI
- **Details**: Implemeted a login UI feature with a Login button that would trigger a pop up with slow zoom animation to a login page with username and password fields and a submit button
- **Link to Commit**: [Commit on index.html, styles.css](https://github.com/lucyzhang04/326Project/commit/6fb51649858458688cf01d4e7c4a762cbec188d9)

### Nov 16, 2024
- **Task**: Polished Login UI and Implemented Mock Login Authentication
- **Details**: Polished login UI in index.html with styling in styles.css, implemented mock authentication using a login-data.json file to validate usernames and passwords with pop up message upon successful and/or failed authentication attempts. This feature was ultimately foregone for the final project as the Spotify API's user account authentication in Milestone 4 requires a different approach from traditional login functionality. 
- **Link to Commit**: [Commit on index.html, styles.css, login-data.json](https://github.com/lucyzhang04/326Project/commit/98892c83200668c8dd75f6b2b60218c8c7805881)

- **Task**: Spotify Songs to be saved in local array storage
- **Details**: User selection of a spotify song from Results box tracked in real-time within a dynamically updated array, forming the groundwork for backend integration in milestone 4. 
- **Link to Commit**: [Commit on index.html, search-song.js](https://github.com/lucyzhang04/326Project/commit/d31114176d8768a45f2ce50e8c61cf3227eae461)

- **Task**: Implemented UI for Selected songs from Results Box
- **Details**: When users click and select song(s) from the Results box, the song(s) are highlighted blue for clarity and when the song is unselected, the highlight is deleted. 
- **Link to Commit**: [Commit on styles.css](https://github.com/lucyzhang04/326Project/commit/66741bac5ba0a99ef522569895d4deea1151b82f)

- **Task**: Designed and implemented To Add box/widget UI next to Results box and logic to dynamically add selected songs
- **Details**: When users click and select song(s) from the Results box, the song(s), a "To Add" box/widget next to the Results box ensures selected songs are dynamically and visually displayed in the "To Add" box without delay and removed upon unselection in real-time leveraging responsive UI logic.
- **Link to Commit**: [Commit on index.html, search-song.js](https://github.com/lucyzhang04/326Project/commit/cee3fbf558e0e58073a7959e624061c56700e318)

### Nov 14 and 15, 2024
- **Task**: Implemented Submit Button below To Add for Song Submission and Redirection 
- **Details**: Before proceeding to the general feed, the submit button makes sure users have added at least one song displayed in "To Add" box. User's selections upon submission are dynamically validated, blocking navigation if no songs are selected. Users are seamlessly redirected to the feed screen, where they may see other people's contributions, after submission is complete.
- **Link to Commit**: [Commit on index.html, styles.css, search-song.js](https://github.com/lucyzhang04/326Project/commit/ff36b9b492b24c50c2c0b33517a084a419a4bf02)
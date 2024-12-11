## Contribution Log for Saadhvi Raghav 

### October 18, 2024 
- **Task** Began creating UI design for main screen of application. 
- **Details** Mapped out location and layout of the feed for user's daily submissions. Made sure that UI encapsulated all elements of application as well, such detailing scroll elements, adding buttons to save or like podcasts, and navigation header for each view/screen. 
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/9f9df3aa59023dd009e32a6c64568a9c620b3bbb)

### October 19, 2024 
- **Task**: Created UI design for trending chart view, and committed both main screen and trending chart screen diagrams to `ui-images` folder.
- **Details**: Detailed layout of trending chart screen, showing what each entry in the chart should look like and what information each entry details.  
- **Commit**: [Commit to ui-images folder](https://github.com/lucyzhang04/326Project/commit/2d1d44eaec9b320e3c0150f8207bcc173abf3adb) 

--- 

- **Task**: Edited `ui-diagrams.md` file. Uploaded diagram for feed page and trending chart page of the application, and added descriptions of features present in each screen.
- **Details**: Explained reasoning behind why specific layout(s) were chosen, and outlined the features that are available in each screen in detail.
- **Commit**: [Commit to ui-diagrams.md](https://github.com/lucyzhang04/326Project/commit/2d1d44eaec9b320e3c0150f8207bcc173abf3adb )
- **Additional Note**: Description addition to `ui-diagrams.md` and `ui-images` folder were pushed as part of the same commit, to ensure the information was presented cohesively. The same link shows both the diagrams and descriptions being added to the repository, but is logged as two separate tasks for organizational purposes. 

### October 20, 2024 
- **Task**: Took notes on October 20, 2024 meeting regarding roles and going over individual contributions of repository. 
- **Details**: Created notes folder for meeting minutes and shared folder with team members, summarizing meeting notes and progress made so far.
- **Commit**: [Commit to report log](https://github.com/lucyzhang04/326Project/commit/7dda4d8e98c22ed799d4c76ddd859c7f91ea19bb)

---

- **Task**: Filled out and formatted `roles.md` file. 
- **Details**: Assigned discussed roles to each team member, writing descriptions for each role and outlining individual responsibilities and contributions to project. 
- **Commit**: [Commit to roles.md](https://github.com/lucyzhang04/326Project/commit/5a9e98c18e8c725ad3a37e7b0a8144631b13d514 )

### October 21, 2024 
- **Task**: Added use cases to description summary of UI diagrams. 
- **Details**: Described use cases for the prompt and upload screen, the feed screen, and the trenching chart screen, explaining how the pages interact and connect with one another and add to the user experience. 
- **Commit**: [Commit to ui-diagrams.md](https://github.com/lucyzhang04/326Project/commit/6f306e52c952325e08097dd024e0bf4026e1155e)

### November 13, 2024 
- **Task**: Created feed-script.js and fleshed out basic UI components of feed page. 
- **Details**: Initiated grid layout and basic structure of web page, as well as updated styles.css to reflect styling of added components. Added basic functionality for loading up a widget and displaying it on feed screen page. Added save button to each widget so each submission can be saved. 
- **Commit**: [Commit to feed-screen branch](https://github.com/lucyzhang04/326Project/commit/6e28b48b03ceee9c8033ab25f29697bd78c79472)

### November 14, 2024 
- **Task**: Added text display to widget submissions. 
- **Details**: Added name and host text displays for submission widgets, pulling from fake submission JSON data. Updated grid functionality so that it could handle a variable number of submissions/widgets. Updated styles.css to make sure UI reflected UI diagram. 
- **Commit**: [Commit to feed-screen branch](https://github.com/lucyzhang04/326Project/commit/6bfffd73187d4b436f735bceed66e9206d5802cf)

---
- **Task**: Added image display to widget submissions. 
- **Details**: Added image displays for submission widgets, pulling from fake submission JSON data/image links. Updated styles.css to make sure UI reflected UI diagram. Also added basic event listener to save button, to show that songs could be saved to user's saved list. 
- **Commit**: [Commit to feed-screen branch](https://github.com/lucyzhang04/326Project/commit/a6ad3797353d55d553498947888d7ea5dda2a6aa)

### November 15, 2024 
- **Task**: Used mock fetch to mimic backend queries to a database to retrieve submission data. 
- **Details**: Updated mock-fetch function, which returns submission data in a Promise and mimics the delay present when querying the backend. Updated feed-script.js to center around the asynchronous architecture, rendering widgets individually when the Promises are resolved. Also added basic error handling if there is an issue retrieving submissions. 
- **Commit**: [Commit to feed-screen branch](https://github.com/lucyzhang04/326Project/commit/66089587988f60d7d4a9e28e5588b06c650361a4)

---
- **Task**: Merged mocking functionality between trending screen and feed screen. 
- **Details**: Added getSubmission function to DatabaseFakeService, combining the mocking for the backend for both UI screens. Updated feed-script.js to reflect new structure and work with an instance of the DatabaseFakeService.
- **Commit**: [Commit to feed-screen branch](https://github.com/lucyzhang04/326Project/commit/a624c9c25f2328953ffd1e6cd554fbbe21746b18)

### November 16, 2024 
- **Task**: Added reset functionality to feed UI screen. 
- **Details**: Updated feed-script.js to listen for Reset events by subscribing to the Reset event using the EventHub. Wrote a clear function to clear all submissions and display an informative message to the user indicating that no submissions are available to display. 
- **Commit(s)**: [Commit 1](https://github.com/lucyzhang04/326Project/commit/6d46597f8473d64fee7443f2b5dba26b2e743929)
                 [Commit 2](https://github.com/lucyzhang04/326Project/pull/55/commits/c31611eb35af3e3c5f46232ae67799a2e318e705)

---
- **Task**: Mocked consistent updates to feed screen submissions. 
- **Details**: Updated submission-fetch to rotate through returned submissions to mock new submissions being retrieved by querying the backend. Updated feed-screen.js to "retrieve" submissions every 4 seconds and re-render feed without an errors. 
- **Commit(s)**: [Commit to branch](https://github.com/lucyzhang04/326Project/pull/56/commits/ce4f72627ab5de9d2c0de3e44f9be057663dd248)

---
- **Task**: Completed feature sequence diagram for feed screen UI 
- **Details**: Used Mermaid syntax to make a feature sequence diagram for feed screen UI; also added description for feature. 
- **Commit(s)**: [Commit to `saadhvi-raghav/feature-sequence-diagram.md`](https://github.com/lucyzhang04/326Project/commit/4033952ce1725f01ef39c074ec4e85ccf495ebc4)

---
- **Task**: Fixed browser sizing issues for feed UI. 
- **Details**: Feed Screen was appearing zoomed in on Chrome but fine on Safari, so re-adjusted sizing of widget grid on feed screen page to make sure that it re-sized properly on both browsers. 
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/2c86198549eaf2a4049fd01bb68d227ed1bad10e)


---
- **Task**: Updated ui-diagrams. 
- **Details**: Updated UI diagrams for all pages to reflect changes to login page as well as a navigation bar. Also added a UI diagram for the saved page. 
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/1d793a168be40b8b1eb4363f4b56fb77539bf66f)

### December 3, 2024 
- **Task**: Added basic feed routes to back-end to service front end feed screen UI.  
- **Details**: Create routes folder and feed-routes.js, and wrote two basic endpoints to get all submissions stored in database, as well as add a recent user submission to the database. Also updated structure of SubmissionController.js to reflect commonjs type rather than using import statements. Updated index.js to mount new routes.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/4e78d48dac5617c4d282e31586990775eafac565)

### December 4, 2024 
- **Task**: Implemented Publisher/Subscriber method on the backend. 
- **Details**: EventHub.js and Event.js files were added in the eventhub folder to provide publisher/subscriber mechanism. SubmissionController.js was modified to publish a newSub event when a submission is successfully added.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/ec311bc718634410a8c011f3f80c1c1d47fe95e5)

---

- **Task**: Implemented WebSocket on the backend. 
- **Details**: Modified `index.js` to open a WebSocket when the backend is started up. Socket listens for connections from clients, and subscribes to the newSub event. When a newSub event is published, backend sends to new submissions to the active clients via the socket. 
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/eb95c279ece4ea9490bec1f823f456d47770de1e)

---

- **Task**: Implemented WebSocket on the backend. 
- **Details**: Modified `index.js` to open a WebSocket when the backend is started up. Socket listens for connections from clients, and subscribes to the newSub event. When a newSub event is published, backend sends to new submissions to the active clients via the socket. Also modified package.json to reflect new dependencies.
- **Commit(s)**: [Commit for server socket](https://github.com/lucyzhang04/326Project/commit/eb95c279ece4ea9490bec1f823f456d47770de1e)
                    [Commit for package.json](https://github.com/lucyzhang04/326Project/commit/22beb72e113c1610524b232af8312ce5f53e856e)

---

- **Task**: Implemented WebSocket on the frontend. 
- **Details**: Modified `feed-script.js` to open a WebSocket when the feed page is displayed. When a new submission is received from a user, that submission is sent from the backend to the frontend via the socket, and will be displayed on the feed UI in real time. 
- **Commit(s)**: [Commit for client socket](https://github.com/lucyzhang04/326Project/commit/306533bc65232e08baeb81ee71862e49c4822835)

---

- **Task**: Modified `feed-script.js` to query endpoint in backend and retrieve submissions stored in submissions database. 
- **Details**: `feed-script.js` queries /feed/get_all_subs endpoint to get submissions stored in database and render them, removing reliance on mocked data.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/0878f541b31edeca26b4853123c291365a997d02)

---

- **Task**: Modified `feed-script.js` to query endpoint in backend and retrieve submissions stored in submissions database. 
- **Details**: `feed-script.js` queries /feed/get_all_subs endpoint to get submissions stored in database and render them, removing reliance on mocked data.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/0878f541b31edeca26b4853123c291365a997d02)

### December 6, 2024
- **Task**: Modified `feed-script.js` to show message if no submissions are present on feed screen. 
- **Details**: A pop-up message appears on the feed screen if no submissions are present, to show users hat no error has occurred and that the application is simply waiting for submissions.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/3308c090818b0155a8a1103d145f83b42f0c9584)

--- 
- **Task**: Modified `index.js` to address CORS issues. 
- **Details**: Modified `index.js` to address CORS issues experiences when querying backend endpoints.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/aa02e6b6ff280b0bd1ecb59a22aa0f06fb914315)

---
- **Task**: Implemented getTodaySubs() method in `SQLiteModel.js`, and modified `SubmissionController.js`; 
- **Details**: Implemented above function to filter queries in the database by date, to retrieve submissions submitted on a particular day. 
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/9affe7b2f7c5e4e8e9fa23c263e2f7acd83015c4)

--- 
- **Task**: Implemented new GET endpoint method in `feed-routes.js`.
- **Details**: Implemented /get_today_subs endpoint in `feed-routes.js`, so frontend can use that route to retrieve submissions only from the current day using methods written above. 
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/d4b928cd9b152d6645f238e729f98b518a60584e)

--- 

- **Task**: Modified `feed-script.js` to use newly defined endpoint.
- **Details**: Modified render() function to query the database using the defined endpoint above, to only display the current day's submissions.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/dc70884c6ac648f03c4421ef229522aaa357565a)

### December 9, 2024
- **Task**: Added get top 3 artists summary statistic to application. 
- **Details**: Added sequelize method to retrieve a user's top 3 artists from past submissions. Added route and modified trending UI as well.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/1f404997a67603634533b12b823f38b153a96ef1)
[Commit](https://github.com/lucyzhang04/326Project/commit/e51a821a921421bb7fc37c64ddfda2007c3194bd)
[Commit](https://github.com/lucyzhang04/326Project/commit/934cdb695ee5275775c80d512e73a05ec3fe68f2)


### December 10, 2024
- **Task**: Fix bug on feed-screen UI
- **Details**: Changed processing/rendering of submissions to accommodate title and artist text of any length.
- **Commit(s)**: [Commit](https://github.com/lucyzhang04/326Project/commit/f43f7171c32e24b5e61718fa5f765c392f7aa049)







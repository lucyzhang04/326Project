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
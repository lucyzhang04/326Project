## Contribution Log for Cynthia Rajeshkanna 

### October 17, 2024 
- **Task** Created a document to outline task delegation and shared it with the team
- **Details** Created a shared task log and planning document, assigning responsibilities for milestone 2 to each team member, setting an internal deadline, brainstorming, and outlining basic features of the application.
- **Commit** [Link to rudimentary planning document, later refined and sent via text](https://docs.google.com/document/d/17lNK80sIwR1QwyuzGkZsnOHbZh3KvmSxcn2JCKdK3cM/edit?usp=sharing)

---

### October 18, 2024 
- **Task** Added the daily theme/quote display feature to `features.md`
- **Details** Drafted an explanation for the daily theme/quote display features, describing its purpose, implementation, and overall integration with the application concept.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/57dc111fa108fc483e893f14b9e8f744e2a51db9)

---

### October 21, 2024 
- **Task**: Added the daily refresh feature to `features.md`
- **Details**: Noted that the daily refresh functionality was mentioned in various files (ex: `problem.md`) as a core feature that needs to be implemented. However, this feature was not included in `features.md`. Thus, drafted an explanation for the daily refresh of feed feature. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/eb10cbc9383eef8efe2accc1fa0106da59809e56) 

---

- **Task**: Fixed the list of features in `problem.md` to match that of `features.md`
- **Details**: Updated the list of core features in `problem.md` to match the features described and explained in `features.md`.
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/2408aea244b18e8b9375d00b2ccf7ed3d464ba06) 

---

- **Task**: Coordinated final review of milestone 2 submission
- **Details**: Organized a zoom meeting with available team members to conduct a final review of milestone 2 submission materials, making various final edits. Also noted all missing components (unfinished individual team member responsibilities) and delegated remaining tasks. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/6ad6e1a9d22148850758988de9bc468f8e86af71)

---

### November 13, 2024 
- **Task**: Created home page `index.html` for quote display and made mock data (`quotes.json`)
- **Details**: Developed the home page UI, specifically the quote display. Also created mock quote data to pull from and display on the screen. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/5b0f5f4372606e9537738954d3f111c5ba947db1) 

---

### November 14, 2024 
- **Task**: Implemented quote generation & display with mock data
- **Details**: Linked quote display UI and mock data such that quotes are pulled from `quotes.json` and in turn displayed on the home page. Implemented with localStorage. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/ccc49189f2763900fcca56640807afc1043c0782) 

---

- **Task**: Fixed quote display/generation bug
- **Details**: There was an issue with initializing quoteIndex, which is the variable used to select a quote from `quotes.json`. Debugged the error and fixed implementation. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/e847906f1d9174f27d1d6a88231522b6ed00eb9b) 

---

- **Task**: Added 24 hour quote update functionality
- **Details**: Updated the script to only change the quote every 24 hours, keeping track of the current quote via localStorage. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/a54a37dbd9e473d738376512ab191ac9d071b179) 

---

- **Task**: Linked home page with logo on navbar
- **Details**: Created a button on the navbar that links to home page. 
- **Commit**: [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/ee09165c1c67d7006023e215e0e8fdc590195a02) 

---

### November 15, 2024 
- **Task**: Developed quote generation and daily update functionality with IndexedDB
- **Details** Implemented logic to keep track of a given day's quote, only updating with a new quote every 24 hours at midnight. Utilized IndexedDB for this functionality.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/a8ffc4708aa6982a086e7f9c708af953037130cb)

---

- **Task**: Created `originalDatabase.js` with general methods for IndexedDB use
- **Details** `originalDatabase.js` has methods to interface with indexedDB. Modified index.html to use these methods and thus utilized indexedDB for keeping track of quotes and updating them, as opposed to prior implementation with localStorage.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/e19a3fa4abf1f71ff7ae17ee7dc5e13b388aa618)

---

- **Task**: Created an m3 folder
- **Details** Created m3 folder for all milestone 3 files.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/57cc9635b890ce40cc8ee85aba0fbfff59bc91ee)

---

### November 17, 2024 
- **Task**: Addressed IndexedDB error
- **Details** Debugged and fixed IndexedDB error on Mai's laptop, as the error did not show up on my own device.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/8e2d762b813d3761594adfcd63b49ec35a32b561)

---

- **Task**: Created and modified feature-sequence-diagram
- **Details** Made a feature-sequence diagram for quote display/generation feature.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/7fd5ce3de2b285fd30e5b9cb70e7eaccb299e739)

---

- **Task**: Updated roles.md
- **Details** Documented top 3 commits for milestone 3
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/d3930f16a6a4b3df7e816e7e4d8c15221c29d482)

---

- **Task**: Updated features.md
- **Details** Documented all features created in milestone 3
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/commit/7a64ae0ec5533455d52f86d8b9c17a2742e32aa8)

---

### December 4, 2024 
- **Task**: Set up API for Fetching Quotes
- **Details** Modified loadQuote() function. Purpose is to utilize API for quote generation, as opposed to prior implementation with mocked data.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/95/commits/811ad247249fc692812c2f374fb67c757329f479)

---

- **Task**: Set up CORS Middleware
- **Details** Modified loadQuote(). Fetch wasn't executing properly, so proxy server was needed.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/95/commits/ebab01d1737ba6fe92b99e93af5baf09f01b5741)

---

- **Task**: Daily Quote Persistance
- **Details** Modified loadQuote(). Needed to ensure the daily quote stays the same for any given day (despite page refresh).
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/95/commits/a043f4550c64cb410bd156de5c5ea4605f68212a)

---

- **Task**: Quotes API Integration Comments
- **Details** Provided comments for code changes associated with Quotes API Integration.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/101/commits/dc3c698371be8cb4fe9b4f1b0852a18a436b5afc)

------

### December 7, 2024
- **Task**: Set up quotes schema
- **Details** Set up quotes table so quote, author, and the associated date will all be tracked.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/130/commits/a1fca9e2fdb0239dd1120b620281fbee7985d43b)

---

- **Task**: Added CRUD operations for quotes table
- **Details** Added method for the quotes table in SQLiteModel.js. Needed CRUD Operations for Quotes table.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/130/commits/53f43ab3d339f87ee974704dd73618b04a672bdd)

---

- **Task**: Created QuotesController.js
- **Details** Has methods to get all quotes, add a new quote, and clear quotes.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/130/commits/5d20b30907f0b8bc11590a838c4d26b527e61f1c)

---

### December 8, 2024
- **Task**: Debugging initial quote generation issue
- **Details** Quote is not generated initially if user has never opened application. Needed to account for when there is no "previous update."
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/108/commits/ef67ca05ad8203f7e4823cf8d7dbfd10fabee234)

---

- **Task**: Debugged quote generation error
- **Details** Quote generation wasn't working on other people's devices, so debugged on Mai's computer.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/110/commits/11ac35f48fdc972d02ad4396bf43a84c478f3f84)

---

- **Task**: Full Database Integration for Quotes
- **Details** Built upon existing SQL database integration for quote-related functionality, debugging issues and making modifications to SQLiteModel.js, QuotesController.js, quote-routes.js, index.html, and index.js.. The focus of these changes being to the quote retrieval functionality. The overall goal is that the same quote should be displayed for all users on a given day.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/135/commits/1617a56b1ac785d548bbf9b053b4e832ce097626)

---

### December 10, 2024
- **Task**: Added comments to explain quote-related code
- **Details** Needed for milestone 4.
- **Commit** [Commit to log entry](https://github.com/lucyzhang04/326Project/pull/162/commits/cbc581ed0f93e8eabbeb260b62ce13e342e68ad3)

---

- **Task**: Updated reports.md
- **Details** Needed for milestone 4.

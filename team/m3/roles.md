# Team Roles and Commit Contributions

## Lucy Zhang - Project Manager 
- **Role**: Responsible for ensuring that team is on track with regards to implementation goals. Lucy will ensure that individual contributions are cohesive and line up with the timeline set up and agreed upon by members.
- **Top 3 Commits**:
  1. [Commit 1](https://github.com/lucyzhang04/326Project/commit/20d0ace5f7b6d82d3c91d1131f2ab873e88dc058): Create trending page. Loads navigation bar, fetches data using fake data to display top 5 trending songs/podcasts.

    Later commits that update/modify this commit: [Update 1](https://github.com/lucyzhang04/326Project/commit/f914d1e9b75108f38bc369ecb875f2ce04171848) , [Update 2](https://github.com/lucyzhang04/326Project/commit/e43f0651baf936aa57a0265118031ae4bb98d284). 

  
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/07ecd62bbe4ad2f91c74aaf2ebe487f02bd668ed): Create DatabaseFakeService.js to support EventHub/subscriber model architecture. Create file to support fetch function that return the fake data for trending page.
  
    Later commits that update/modify this commit:[Update 1](https://github.com/lucyzhang04/326Project/commit/e43f0651baf936aa57a0265118031ae4bb98d284) , 
[Update 2](https://github.com/lucyzhang04/326Project/commit/f914d1e9b75108f38bc369ecb875f2ce04171848)


  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/f914d1e9b75108f38bc369ecb875f2ce04171848): Add like functionality to trending page entries. Interacts with indexedDB to save liked songs/podcasts and then display on "saved" page.

## Saadhvi Raghav - Note-Taker
- **Role**: Responsible for documenting team meetings, ensuring that members have a way to clearly reference their responsibilities and tasks for the upcoming weeks as discussed. 
- **Top 3 Commits**:
  1. [Commit 1](https://github.com/lucyzhang04/326Project/commit/7dda4d8e98c22ed799d4c76ddd859c7f91ea19bb): Created drive folder to organize meeting minutes by date, and shared notes folder with team members. 
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/5a9e98c18e8c725ad3a37e7b0a8144631b13d514): Updated `roles.md` file with roles and responsibilities discussed during team meeting. Filled out roles and completed summary description of each role.
  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/2d1d44eaec9b320e3c0150f8207bcc173abf3adb): Created UI diagrams of main feed screen and trending chart screen of application as discussed during team meeting. Also completed descriptions/summaries of the diagrams in `ui-diagrams.md`.

## Neha Aryasomayajula - Quality Control 
- **Role**: Responsible for overseeing files submitted by team, verifying that all submitted work is clear, organized, and free of errors. Neha will ensure that all individual work done by members is cohesive across all aspects of the project and presented as a coordinated submission. 
- **Top 3 Commits**:
  1.  [Main navigation bar commit](https://github.com/lucyzhang04/326Project/commit/81aa7cc46be48c9aba6ac9a04e1ed950ac695a8a): Set up project from scratch. Added navigation bar to toggle between "Feed" and "Trending" tabs.
  2.  [Main IndexedDB commit](https://github.com/lucyzhang04/326Project/commit/78a01af92d81396702b734ec877b97e3b0ed16da): Added methods to open IndexedDB instance, add individual songs to database, get all songs from database, and clear all songs from database.
  3.  [Main saved page commit](https://github.com/lucyzhang04/326Project/commit/513732f260d4e21cb40b014ad6f579f13ef3f848): Retrieving liked songs from IndexedDB instance and dynamically displaying them on the screen.
     
Additional commits related to #1:
[Adding new tab to nav bar](https://github.com/lucyzhang04/326Project/commit/f2a9400d8bd1ccccb12f1354a5c67908f7c3eaec) and [Adding width responsiveness to nav bar](https://github.com/lucyzhang04/326Project/commit/6f5247bb4f5dda19b38e108cad4c7835f2c7b292)

Additional commit related to #2: [Adding primary key to database schema](https://github.com/lucyzhang04/326Project/commit/a9e23acb865ba4bd73d683536f25c7e2272d4a32)

Additional commit related to #3: [Daily reset for saved page](https://github.com/lucyzhang04/326Project/commit/b6cf439d6988b9be38faf85d302138a62a82531f)

## Elijah Sippel - Documentation Lead
- **Role**: Responsible for overseeing documentation of team project. Elijah verifies that all of the project documentation is accurate and clearly reflects the "state" of project. Elijah ensures that team members can easily understand to-dos as well as completed features for easy integration of new work/code. 
- **Top 3 Commits**:
  1. [Commit 1](https://github.com/lucyzhang04/326Project/commit/f5aecdb38a0f25b50722f764cbb87b11d29f1976): Updated `data.md` to reflect our teams new plan plan for Spotify API authentication (from OAuth user authentication to client authentication with an API key).
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/d2fd263c6408982cffacd38e6d3867b7ebb79ff9): Created/moved folder for `team/reports` to ensure proper navigation of our markdown files.
  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/bcef01828d09df5b240cb843decd0f1062fc3a55): Document the plan for data usage and storage for the project, including clarifying information to help the team move forward with implementing features in the future. 

## Cynthia Rajeshkanna - Task Manager 
- **Role**: Responsible for detailing tasks and to-dos for each feature. Cynthia will ensure that tasks are broken down fairly and assigned to team members logically, allowing for the team to collaborate on the project in an organized and timely manner.
- - **Top 3 Commits [Milestone 3]**:
  1. [Commit 1](https://github.com/lucyzhang04/326Project/commit/ccc49189f2763900fcca56640807afc1043c0782): Implemented the basic quote generation & display feature in `index.html`. Developed the UI for the initial page of the Remind.me site on which users can view the daily quote. Also created mock data in `quotes.json`, which is pulled and displayed on the page accordingly.
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/a54a37dbd9e473d738376512ab191ac9d071b179): Updated script in `index.html` to change the quote every 24 hours at midnight, while also keeping track of the current quote. In essence, implemented logic to keep track of a given day's quote, only updating with a new quote every 24 hours at 12 am EST.
  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/e19a3fa4abf1f71ff7ae17ee7dc5e13b388aa618): Created `originalDatabase.js` with general methods to interface with indexedDB. Modified `index.html` to use these methods and thus utilized indexedDB for keeping track of quotes and updating them, as opposed to prior implementation with localStorage.
- **Top 3 Commits [Milestone 2]**:
  1. [Commit 1](https://github.com/lucyzhang04/326Project/commit/57dc111fa108fc483e893f14b9e8f744e2a51db9): Added the daily theme/quote display feature and accompanying description to `features.md`.
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/eb10cbc9383eef8efe2accc1fa0106da59809e56): Revised `features.md` to include the daily refresh of feed feature mentioned in `problem.md` and other files (wrote a brief description describing functionality and purpose). 
  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/6ad6e1a9d22148850758988de9bc468f8e86af71): Closely monitored progress on all tasks and set an internal deadline to keep everyone on track. Ultimately, finalized all milestone 2 documents and files before submission (the commit linked is one such final revision - consistency across files, particularly `problem.md`).

## Mai Chi Le - Communications Lead
- **Role**: Ensures that team communicates thoroughly regarding project tasks and receives meeting summaries. Mai is responsible for ensuring that team members are informed of major project developments, upcoming team meetings and enables overall communication between team members. 
- **Top 3 Commits**:
  1. [Commit 1](): Communicated on groupchat, set and suggested times to work on assigned tasks/code and times to review code, made sure everyone was aware and followed meeting times and deadlines 
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/ab89fade07d1cda659e2cb59c90f17506eebde5c): Replaced FirstScreenPrompt.png with a corrected image without a large border
  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/dab73481ae91a9e9e54e9ce149338812e51c980e): Updated users.md to effectively establish and communicate the intended audience of the app to all team members

## Marie Shvakel - Timekeeper
- **Role**: Marie is responsible for ensuring that the team is on track to meet project deadlines, as well as internal deadlines set for individual tasks given by the Task Manager.
- **Top 3 Commits [Milestone 3]**:
  1. [Commit 1] (https://github.com/lucyzhang04/326Project/commit/4613f8ee2e3acb4bfc1f7868e97f90f7715a81bb): Implemented Spotify Query using Spotify Web API that querys Spotify for requested songs, searches by song name, and returns list of songs and respective artists that match that request.
  2. [Commit 2] (): Registered "remind.me" as a Web App in development in Spotify. Added team members as users with access. Created a redirect URI to display query results. 
  3. [Commit 3] (https://github.com/lucyzhang04/326Project/commit/2ac5a9a9016f1bf49c3d169333ae94c4787e178b): Updated features.md to include & describe the Spotify Query feature that was implemented by me using the Spotify Web API & Express.js.
- **Top 3 Commits [Milestone 2]**:
  1. [Commit 1](https://github.com/lucyzhang04/326Project/commit/0a29e68af9bc31b76a237f0f180c646e49843342): Filled out `ui-diagrams.md` to explain the different aspects of the first screen, along with a picture of the diagram of the first screen made using figma.
  2. [Commit 2](https://github.com/lucyzhang04/326Project/commit/f818ee9323554a6c8841683ab142f76b891f4c58):I described our problem statement, problem solution, and why it matters in `problem.md`.
  3. [Commit 3](https://github.com/lucyzhang04/326Project/commit/27d275312719508b0f4037c4d6a0657357b18e25): Edited `marie-shvakel.md` to include timekeeper work and information

# Contribution Log for Lucy Zhang 

## October 16, 2024
- **Task**: Set up initial GitHub repository.
- **Details**: Created the main repository and shared with contributors.
- **Link to Commit**: [Initial Commit](https://github.com/lucyzhang04/326Project/commit/ff00ccbc044c06cac789322f558490c04884f5ae)


## October 18, 2024
- **Task**: Set up project structure.
- **Details**: Created folder for `team/m2` and created files for Milestone 2 (roles.md, users.md, problem.md, ui_diagrams.md). Added formatting/headers to be consistent with example files.
- **Link to Commits**:
  - [Commit on roles.md](https://github.com/lucyzhang04/326Project/commit/a55deeed13ca7bef8d79f10a4214d3bb489d4e9d)
  - [Commit on problem.md](https://github.com/lucyzhang04/326Project/commit/f261abc0219c84e9bccad1cbacc9fc068fab217e)
  - [Commit on users.md](https://github.com/lucyzhang04/326Project/commit/da2f2caa7a8801b6d6cee3dcf2034816b9c22d6b)
  - [Commit on ui-diagrams.md](https://github.com/lucyzhang04/326Project/commit/e245f0f5d5b041f939ef059d82b8b5add2eb281c)
 
- **Task**: Add descriptions to features.md
- **Details**: Added descriptions for recommendation feed and widgets in the features.md file
- **Link to Commit**: [Commit on features.md](https://github.com/lucyzhang04/326Project/commit/431b6617e75f72058c958108f6b8096055bb3239)

## November 11, 2024
- **Task**: Create trending UI
- **Details**: Create fake json file to mock data response from database in order to populate trending table.
- **Link to Commit**:
  - [Create trending-script.js for trending page functionality](https://github.com/lucyzhang04/326Project/commit/3858b7908fadfc73f01534aca11e1f637203eff1)
  - [Create fake trending item json file](https://github.com/lucyzhang04/326Project/commit/40fc21867786b5b7f0c55e8db60b10b02ecafcae)
 

## November 13, 2024
- **Task**: Reupload trending UI files.
- **Details**: Had to reupload due to some issues in main branch; last few commits had to be reverted and reuploaded.
- **Link to Commit**:
  - [Reupload trending-script.js](https://github.com/lucyzhang04/326Project/commit/4d76cbb178758e4276efa7a129af7b07ca3fd40b)
  - [Modify trending data json file location](https://github.com/lucyzhang04/326Project/commit/275d06699b09706be6723fdff9295e42176b1e39)

## November 15, 2024
- **Task**: Mock fetching from server-side database
- **Details**: Mocked the fetching of trending data from the server-side database that stores all shared/recommended songs/podcasts.
- **Link to Commit**:
  - [Create mock fetch file](https://github.com/lucyzhang04/326Project/commit/f914d1e9b75108f38bc369ecb875f2ce04171848)
  - [Create service class that mocks the service of pulling from database](https://github.com/lucyzhang04/326Project/commit/07ecd62bbe4ad2f91c74aaf2ebe487f02bd668ed)
  - [Update necessary files to use the mock fetching](https://github.com/lucyzhang04/326Project/commit/169ebd0c2a6af47c2962423a37e4a3d45bec6378)
 
- **Task**: Adding liked songs to indexedDB
- **Details**: Modified trending-script.js to support like feature that saves entries to indexedDB instance so that they can be loaded onto the saved page.
- **Link to Commit**:
  - [Update trending-script to add to database](https://github.com/lucyzhang04/326Project/commit/169ebd0c2a6af47c2962423a37e4a3d45bec6378)
  - [Create class that creates single instance of indexedDB so multiple pages can use the single instance](https://github.com/lucyzhang04/326Project/commit/b56af94c4311bf2cb34c64a71db0bd5da4a5d001)

## November 16, 2024
- **Task**: Add reset functionality
- **Details**: Add reset event for observable pattern. Add subscribers in the relevant files to listen for reset updates so that page content will be cleared.
- **Link to Commit**:
  - [Add reset event publishing to index.html](https://github.com/lucyzhang04/326Project/commit/3d5a2309c0992c2060fba5f0c2d0d1ec489eb79e)
  - [Add reset event in Events file](https://github.com/lucyzhang04/326Project/commit/a13c5deb4e1f737052e31f8e53b394e2695200da)
  - [Subscribe to reset event on trending page](https://github.com/lucyzhang04/326Project/commit/945227aec76fcdd86ea0996bd17a7204e2630720)
 
- **Task** Modify mocking functionality to mimic dynamic updates
- **Details**: Modify mock fetch file to return different information when called such that trending page shows updated info every 5 seconds.
  - [Updated mocking functionality](https://github.com/lucyzhang04/326Project/commit/e43f0651baf936aa57a0265118031ae4bb98d284)

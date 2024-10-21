# Application Features

## Daily Theme/Quote Display
The landing page of the website will display a new daily theme, particularly a phrase, quote or sentence, for which users can upload a song or podcast that they feel best aligns with the daily theme. Every day, the theme will be updated (tentatively at 12:00am EST) for all platform users in order to inspire regular contributions and thereby boost user engagement. In a given day, users will upload media for the same theme, establishing a collaborative platform environment.

**Assigned to:** Cynthia Rajeshkanna

## Song/Podcast Upload
On the website's landing page, users can search for a song or podcast using a search bar. After submitting their query, a list of matching results will be displayed on the screen, fetched via one or more API calls to the Spotify REST API. Users can then select one of the displayed results, and their selection will be carried over to the next screen. This enables the main functionality of the application, which is to let users view each other's daily selections in a scrollable feed.

**Assigned to:** Mai Chi Le

## Recommendation Feed (from other users)
After uploading a song or podcast, the user will be brought to the dashboard. This dashboard will contain a section describing daily analytics as well as widgets that represent individual responses. This will allow users to see the most popular contributions and further explore podcast series and/or albums. 

### Daily Analytics
Above the widgets of individual user responses, a user can view the top 5 songs or podcasts of the day, along with the number of people who recommended each one. Each song or podcast will be represented by an image icon (either an album cover or podcast cover). This helps users discover popular or trending content, which can lead to better recommendations. 

**Assigned to:** Lucy Zhang

### Widgets of User Responses
These widgets represent individual contributions; these will contain an image (likely an album cover or podcast cover image) as well as an identifier (ie: the user's name that is entered when uploading their response). This will allow users to visualize the activity and see updates as other users contribute.

**Assigned to:** Neha Aryasomayajula

### Daily Refresh of Feed
The theme is updated daily (tentatively at 12:00am EST) for all platform users. In turn, the feed displaying user response widgets must be "refreshed" as well. The recommendation feed will display the new user responses for the updated daily theme. Put simply, it will be cleared daily, accepting and populating entirely new responses/recommendations.

**Assigned to:** Elijah Sippel

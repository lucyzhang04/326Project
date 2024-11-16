# Application Features

## Daily Theme/Quote Display

The landing page of the website will display a new daily theme, particularly a phrase, quote or sentence, for which users can upload a song or podcast that they feel best aligns with the daily theme. Every day, the theme will be updated (tentatively at 12:00am EST) for all platform users in order to inspire regular contributions and thereby boost user engagement. In a given day, users will upload media for the same theme, establishing a collaborative platform environment.

**Point Value: 3 points (medium feature)**
**Assigned to:** Cynthia Rajeshkanna

## Daily Refresh of Feed

The theme is updated daily (tentatively at 12:00am EST) for all platform users. In turn, the feed displaying user response widgets must be "refreshed" as well. The recommendation feed will display the new user responses for the updated daily theme. Put simply, it will be cleared daily, accepting and populating entirely new responses/recommendations.

Point value: 1 point (small feature)
**Assigned to:** Elijah Sippel

## Song/Podcast Upload

On the website's landing page, users can search for a song or podcast using a search bar. After submitting their query, a list of matching results will be displayed on the screen, fetched via one or more API calls to the Spotify REST API. Users can then select one of the displayed results, and their selection will be carried over to the next screen. This enables the main functionality of the application, which is to let users view each other's daily selections in a scrollable feed.

As of Milestone 3, we are mocking the song search using static data. This feature includes considerable thought and integration wiht other features, as each stage of the form leads to additional data being loaded, displayed, and stored.

Point Value: 4 points (medium feature)
**Assigned to:** Mai Chi Le and Elijah Sippel

## Navigation Bar 
Users will be able to toggle between the "Feed", "Trending", and "Saved" pages by clicking on hyperlinks in the navigation bar. The navigation bar will provide visual feedback to the user by indicating which tab is active at any given moment and by including a hover effect. It will also respond appropriately to screen maximization.

Point Value: 3 points (medium feature)
**Assigned to:** Neha Aryasomayajula

## Recommendation Feed

After uploading a song or podcast, the user will be brought to the personal feed screen. This page will display widgets representing songs that you and other users have contributed. At the top of the page, there is the navigation bar as described above. Every time another user contributes a song/podcast entry, the feed will be updated with the recommendations. As well, when the quote resets, the recommendation feed will be cleared. 

### Song/Podast Widgets

These widgets represent individual contributions; these will contain an image (likely an album cover or podcast cover image) as well as an identifier (ie: the user's name that is entered when uploading their response). This will allow users to visualize the activity and see updates as other users contribute.

**Assigned to:** Saadhvi Raghav

### Dynamic Update of Widgets
**Assigned to:** Saadhvi Raghav

### Daily Reset of Feed 
**Assigned to:** Saadhvi Raghav

## Trending Page
On the trending page, a user can view the top 5 songs or podcasts of the day, along with the number of people who recommended each one. Each song or podcast will be represented by an image icon (either an album cover or podcast cover). This helps users discover popular or trending content, which can lead to better recommendations.

- **Analytics Table**:
This will display the top 5 shared songs/podcasts. The analytics bar interfaces with the server-side database and fetches the top songs/podcasts. 

Point Value: 3 points (medium feature)
**Assigned to:** Lucy Zhang

### Like Button
For each entry in the trending table, users are able to "like" the entry. When a user clicks the like button, the entry is added to an indexedDB instance such that the data can be displayed on the saved songs/podcast page. (3 points)

If the song is in the indexedDB instance, an alert will indicate that the song has been added to the saved respository. Otherwise, the song is already liked, and an alert will indicate that the song is already a liked item. (2 points)

Point Value: 5 points [3 points (medium feature) + 2 points (medium feature)]

**Assigned to:** Lucy Zhang 

### Daily Reset of Trending
When the daily refresh of the quote/feed occurs, a Reset event will be published and the trending screen will reset--thereby clearing the table. 

Point Value: 2 points (medium feature)

**Assigned to:** Lucy Zhang 

## Saved Page
Users have the option to like songs/podcasts on the trending and feed pages. The "Saved" page will display songs that a user has liked on either of those pages through interacting with an IndexedDB instance.

Point Value: 3 points (medium feature)
**Assigned to:** Neha Aryasomayajula

### Daily Reset of Saved Entries
**Assigned to:** Neha Aryasomayajula


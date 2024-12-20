# Application Features

## Daily Theme/Quote Display

The landing page of the website will display a new daily theme, particularly a phrase, quote or sentence, for which users can upload a song or podcast that they feel best aligns with the daily theme. Every day, the theme will be updated (tentatively at 12:00am EST) for all platform users in order to inspire regular contributions and thereby boost user engagement. In a given day, users will upload media for the same theme, establishing a collaborative platform environment.

- **Quote Display**
  -  When users open up the application, they are immediately taken to the home page on which the daily quote is generated and displayed. The quote for the day is fetched from quotes.json (the mock data for this implementation of the front-end). To ensure all users, across different devices and sessions observe the same quote on any given day, a quote is selected based on a common index stored in an IndexedDB database. From there, the quote associated with that given index is simply displayed on the home page for the user. 

  - <ins>Point Value:</ins> 3 points (medium feature)
  
  - <ins>Assigned To:</ins> Cynthia Rajeshkanna


- **Daily Quote Generation/Reset**
  - As for the daily quote generation functionality, at midnight, the quote is changed/updated to a new daily quote. Utilizing the EventHub, a 24 hour timer is used to accordingly update the new daily quote and the values associated with it (the index and previous update).

  - <ins>Point Value:</ins> 3 points (medium feature)

  - <ins>Assigned To:</ins> Cynthia Rajeshkanna


- **Daily Quote Consistency/Persistance**
  - In order to ensure that users see the same daily quote and that the quote is not updated prematurely, the time of the previous update is also stored in the database. The current date and previous quote update are tracked via IndexedDB to ensure unnessary/premature/delayed quote generation doesn't occur.

  - <ins>Point Value:</ins> 2 points (medium feature)

  - <ins>Assigned To:</ins> Cynthia Rajeshkanna


## Daily Refresh of Feed

The theme is updated daily (tentatively at 12:00am EST) for all platform users. In turn, the feed displaying user response widgets must be "refreshed" as well. The recommendation feed will display the new user responses for the updated daily theme. Put simply, it will be cleared daily, accepting and populating entirely new responses/recommendations.

Point value: 1 point (small feature)
**Assigned to:** Elijah Sippel

## Song/Podcast Upload

On the website's landing page, users can search for a song or podcast using a search bar. After submitting their query, a list of matching results will be displayed on the screen, fetched via one or more API calls to the Spotify REST API. Users can then select one of the displayed results, and their selection will be carried over to the next screen. This enables the main functionality of the application, which is to let users view each other's daily selections in a scrollable feed.

As of Milestone 3, we are mocking the song search using static data. This feature includes considerable thought and integration with other features, as each stage of the form leads to additional data being loaded, displayed, and stored.

Point Value: 4 points (large feature)

**Assigned to:** Mai Chi Le and Elijah Sippel

- **Dynamic Update for "To Add" Widget**
  -  When users click and select song(s) from the Results box, the song(s) are highlighted blue for clarity and when the song is unselected, the highlight is deleted. Furthermore, a "To Add" box/widget next to the Results box ensures selected songs are dynamically, visually displayed in the "To Add" box without delay and removed upon unselection in real-time leveraging responsive UI logic.

  - <ins>Point Value:</ins> 3 points (medium feature)

  - <ins>Assigned To:</ins> Mai Chi Le

- **Submit Button with Validation**
  - Before proceeding to the general feed, the submit button makes sure users have added at least one song displayed in "To Add" box. User's selections upon submission are dynamically validated, blocking navigation if no songs are selected. Users are seamlessly redirected to the feed screen, where they may see other people's contributions, after submission is complete.

  - <ins>Point Value:</ins> 2 points (medium feature)

  - <ins>Assigned To:</ins> Mai Chi Le

- **Storing Songs in Array (Foundation for Backend Integration)**
  User selection is tracked in real-time within a dynamically updated array, forming the groundwork for backend integration in milestone 4. This array ensures selections are recorded in real time and provides the necessary data structure for storage and for further processing.

  - <ins>Point Value:</ins> 1 point (small feature)

  - <ins>Assigned To:</ins> Mai Chi Le

## Spotify Query

The Spotify Query implements the Spotify Web API and uses Express.js to query specific songs from Spotify. This will be integrated further with the frontend in milestone 4. Specifically, when users type in a song in the input field on the front screen, they will be able to select one of the displayed results that has been generated by the spotify query and that data will be saved.

For milestone 3, we have the spotify query folder separate from the rest of the frontend development. They will be integrated when we work more on the backend in milestone 4.

Currently, the spotify query is able to search for songs in Spotify that have been requested within the code (currently it asks for songs with the name "Sweet Nothing"). Remind.Me is registered as a web app for Spotify. We have a redirect URI: http://localhost:8888/callback; when launched, the web app simply displays the lists of songs and the respective artists that match the query request.

Point Value: 5 points (large feature)

**Assigned to:** Marie Shvakel

## Navigation Bar 
Users can navigate between the "Feed," "Trending," and "Saved" pages by clicking hyperlinks in the navigation bar. The navigation bar will visually indicate the active tab and include a hover effect for each tab to enhance interactivity. Additionally, the navigation bar will adapt its layout to fit maximized screens.

<ins>Point Value:</ins> 3 points (medium feature)

<ins>Assigned to:</ins> Neha Aryasomayajula

## Recommendation Feed

After uploading a song or podcast, the user will be brought to the personal feed screen. This page will display widgets representing songs that you and other users have contributed. At the top of the page, there is the navigation bar as described above. Every time another user contributes a song/podcast entry, the feed will be updated with the recommendations. As well, when the quote resets, the recommendation feed will be cleared. 

- **Song/Podast Widgets:**

  These widgets represent individual contributions; these will contain an image (an album cover or podcast cover image) as well as an identifier (ie: the name of the podcast/song and the name of the artist/hosts) -- all retrieved from stored data. This will allow users to visualize the activity and see updates as other users contribute. Each widget is also animated to appear in an aesthetically pleasing way. 

  <ins>Point Value:</ins> 3 points (medium feature)

  **Assigned to:** Saadhvi Raghav

- **Dynamic Update of Widgets:**

  The submissions are retrieved from a backend database (currently being mocked using a fake database service) and displayed dynamically. Every 4 seconds, the page refreshes the stored data by requesting data again, displaying the newly added submissions to the page. 

  <ins>Point Value:</ins> 3 points (medium feature)
  **Assigned to:** Saadhvi Raghav

- **Daily Reset of Feed:**

  At midnight of each day, the feed is "reset", clearing out the displayed submissions. If there are no submissions to be displayed, a new div element pops up, indicating that there are no submissions to display. If the page is reloaded and new submissions are received, then the rendering begins anew with the new submissions. 

  <ins>Point Value:</ins> 2 points (medium feature)

  **Assigned to:** Saadhvi Raghav

- **Save Button**
  Each widget has a save button that the user can use to save a particular song to their saved songs. This will add the selected song to an IndexedDB instance, which the "saved" page pulls from to display a user's selected songs.

  <ins>Point Value:</ins> 3 points (medium feature)

  **Assigned to:** Saadhvi Raghav

## Trending Page
On the trending page, a user can view the top 5 songs or podcasts of the day, along with the number of people who recommended each one. Each song or podcast will be represented by an image icon (either an album cover or podcast cover). This helps users discover popular or trending content, which can lead to better recommendations.

- **Analytics Table:**
  
  This will display the top 5 shared songs/podcasts. The analytics bar interfaces with the server-side database and fetches the top songs/podcasts. 

  <ins>Point Value:</ins> 3 points (medium feature)
  
  <ins>Assigned to:</ins> Lucy Zhang

- **Like Button:**

  For each entry in the trending table, users are able to "like" the entry. When a user clicks the like button, the entry is added to an indexedDB instance such that the data can be displayed on the saved songs/podcast page.   (3 points)

  If the song is in the indexedDB instance, an alert will indicate that the song has been added to the saved respository. Otherwise, the song is already liked, and an alert will indicate that the song is already a liked        item. (2 points)

  <ins>Point Value:</ins> 5 points [3 points (medium feature) + 2 points (medium feature)]

  <ins>Assigned to:</ins> Lucy Zhang 

- **Daily Reset of Trending:**
  When the daily refresh of the quote/feed occurs, a Reset event will be published and the trending screen will reset--thereby clearing the table. 

  <ins>Point Value:</ins> 2 points (medium feature)

  <ins>Assigned to:</ins> Lucy Zhang 

## Saved Page
Users can like songs or podcasts on the "Trending" and "Feed" pages. Any songs or podcasts they like will appear on the "Saved" page. This page filters the full list of songs and podcasts to display only the ones the user has liked.

- **Analytics Table:**
  - The user's liked songs/podcasts are retrieved from an IndexedDB instance. These cached results are displayed in an analytics table. The table updates dynamically when new songs/podcasts are added to the database (3 points).
  - Specific care is taken to avoid displaying duplicate songs on the Saved Page. This is done by enforcing a primary key constraint on the combination of a song/podcast title and the artist/host in the IndexedDB instance (2 points).

<ins>Point Value:</ins>: 5 points [3 points (medium feature) + 2 points (medium feature)]
  
<ins>Assigned To:</ins> Neha Aryasomayajula


- **Daily Reset of Saved Entries:**
When the daily refresh of the quote/feed occurs, a Reset event will be published, and the "Saved" screen will reset. This clears the table

<ins>Point Value:</ins> 2 points (medium feature)

<ins>Assigned To:</ins> Neha Aryasomayajula


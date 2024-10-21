# UI Diagrams 

## Prompt and Upload Screen
The prompt and upload screen features a quote/theme of the day and input boxes for the user's username and submission. The user will submit a song/podcast they feel reminds them of the quote/theme of the day. The user is not able to view or access their feed or the trending section until they make a contribution for the quote/theme of the day. Additionally, the user is only able to make one submission each day. 

![](./ui-images/FirstScreenPrompt.png)

On this screen, there are three main elements
1. **Daily Quote Display**. The quote/theme of the day is positioned front and center. If it is a quote, it will credit the person that originated it. 
2. **User Input**. There are two input boxes positioned below the daily quote display, and they prompt the user to input their username and their submission of a related song/podcast. Right below these two boxes is a submit button.
3. **Daily Refresh**.The screen will update daily to display a new, different daily quote/theme and allow users to make a new submission. 

**Use Case** This screen is a pivotal part of our application, as it prompts the user to think about what they have been reading or listening to lately and connect it with the given theme of the day. That is one of the central aspects of our application. It allows them to submit whatever podcast or article they wish. Upon submission by hitting "submit", the user will be redirected to the feed screen to see other's submissions. 

## Feed Screen
The Feed Screen is where the user will be directed to after uploading their submission to the "theme of the day". This screen is designed to allow the user to interact with the submissions of other individuals. The UI is designed to be organized and aesthetically appealing, allowing users to easily view the submissions and get basic information about them. It also allows them to interact with other users in a simple yet effective manner. 

![](./ui-images/feed.png)

On this screen, there are four main elements. 
1. **User Feed**. The feed allows users to scroll and see what other users submitted for the given theme of the day. Each submission will have its own "widget" on the feed. Each widget will display a cover photo, the name of the podcast or article, the hosts and/or authors, and other additional information specific to the media. 
2. **Navigation Bar**. A navigation bar is available at the header of the page to allow the user to switch between looking at their feed and looking at trending submissions.  
3. **Like Button**. Each widget will have a like button at the bottom left, allowing users to "heart" other users' submissions. 
4. **Daily Refresh**. The feed should clear at the start of each day, allowing a new cycle of submissions to pop up specific to the new day's topic. 

**Use Case** This screen is an essential part of our application, as it allows users to interact with the submissions of other individuals. It exposes them to new media that they may not have heard of before, and allows them to explore new podcasts or articles that they are interested by. They can like submissions to show their appreciation, and use the navigation bar to switch between the trending screen and feed screen. 


## Trending Screen
The Trending Screen is where the user will be directed to after uploading their submission to the "theme of the day". This screen is designed to allow the user to gain insight into the most popular submissions. The UI is designed in a leaderboard fashion so that users can quickly glance at the trending board without being overwhelmed with information. 

![](./ui-images/trending_chart.png)

On this screen, there are four main elements. 
1. **Trending Chart**. The trending chart allows users to view the most popular media submitted for that day. The top 5 podcasts/news articles will be ranked in order, displaying the title, name/podcast, and the number of submissions. A like button will also be available so that other users can "like" the trending submissions. 
2. **Navigation Bar**. A navigation bar is available at the header of the page to allow the user to switch between looking at their feed and looking at trending submissions.  
3. **Like Button**. Each widget will have a like button at end of its entry, allowing users to "heart" the podcast/news article.
4. **Daily Refresh**. The trending chart should clear at the start of each day, allowing a new cycle of submissions to pop up specific to the new day's topic. 

**Use Case** The use case of this screen is for the user to be able to see what the most popular submissions are, and see how their submission compares to others. They can like any of the trending entries to interact with the chart, as well as navigate to the feed using the navigation bar to toggle between the two screens. 


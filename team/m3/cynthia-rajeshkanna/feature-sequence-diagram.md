### Feature: Daily Quote Generation and Display

***Description**: The daily quote displayed on the home page of the application is integral to the application as a whole. It defines a new theme daily for which users can then submit a song/podcast. When users open up the application, they are immediately taken to the home page on which the daily quote is generated and displayed. The quote for the day is fetched from quotes.json (the mock data for this implementation of the front-end). To ensure all users, across different devices and sessions observe the same quote on any given day, a quote is selected based on a common index stored in an IndexedDB database. From there, the quote associated with that given index is simply displayed on the home page for the user. In order to ensure that users see the same daily quote and that the quote is not updated prematurely, the time of the previous update is also stored in the database. As for the daily quote generation functionality, at midnight, the quote is changed/updated to a new daily quote. Utilizing the EventHub, a 24 hour timer is used to accordingly update the new daily quote and the values associated with it (the index and previous update).


```mermaid
sequenceDiagram 
    User ->> index.html (home page UI): User opens Remind.me application and is brought to home page
    index.html ->> IndexedDB Database (originalDatabase.js): Opens quotesDB
    IndexedDB Database ->> index.html: Connection established
    index.html ->> IndexedDB Database: Gets prevUpdate and quoteIndex values
    IndexedDB Database ->> index.html: Values are obtained
    index.html ->> quotes.json (mock quote data): Quote data is fetched
    quotes.json ->> index.html: List of quotes is obtained
    index.html ->> IndexedDB Database: If necessary (new day), prevUpdate and quoteIndex are updated
    index.html ->> index.html: Current daily quote is rendered
    index.html ->> User: Quote is displayed on the home page
    index.html ->> EventHub: Subscribes to daily (24 hour) quote update timer
    EventHub ->> index.html: Daily quote update occurs at midnight
    index.html ->> IndexedDB Database: prevUpdate and quoteIndex values are updated to reflect new day
    index.html ->> quotes.json: Quote data is fetched
    index.html ->> index.html: New daily quote is rendered.
    index.html ->> User: New daily quote is displayed
```
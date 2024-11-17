This diagram illustrates the "Saved" screen feature and its role within the application. The "Saved" screen displays songs that users have liked from the "Trending" and "Feed" pages. These liked songs are stored in an IndexedDB instance, and the "Saved" screen dynamically updates by retrieving the latest data from the database whenever a new song is liked. Users can navigate between the "Saved" screen and other screens using a navigation bar. Additionally, the "Saved" screen resets every 24 hours by subscribing to a shared Reset event.

```mermaid
sequenceDiagram 
    loop Load Background
    Saved UI->>Saved UI: Load background/navigation bar.
    end
    IndexedDB ->> Saved UI: Retrieves liked songs from database
    loop Render Results
    Saved UI-->>Saved UI: Display liked songs
    end
    Saved UI->> Trending and Feed UI: Using navigation bar
    Trending and Feed UI ->> Saved UI: Using navigation bar
    Login and Submission UI ->> EventBus: Publishes daily reset event 
    EventBus->>Saved UI: Forwards daily reset event
    Saved UI->>EventBus: Subscribes to daily reset event
```

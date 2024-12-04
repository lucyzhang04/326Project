
const express = require('express');
const path = require('path');
const ModelFactory = require('./model/ModelFactory.js');
const eventHub = require("./eventhub/EventHub");
const Events = require("./eventhub/Events.js");
const WebSocket = require("ws"); 

const app = express();
const spotifyRoutes = require("./query-spotify/spotify-routes.js");
const PORT = 8888;

app.use(express.json());
const songRoutes = require("./routes/feed-routes.js");
app.use("/feed", songRoutes);
app.use("/spotify", spotifyRoutes);

const socket = new WebSocket.Server({port: 9000}); 

socket.on("connection", (s) => {
    console.log("A client has connected."); 
    //message to show that connection has been correctly established. 
    s.on("message", (mes) => {
        console.log("Received from client: " + mes); 
    })
    //essentially adding socket to the listeners of newSub event.
    eventHub.subscribe(Events.NewSub, (sub) => {
        console.log("Sending: "); 
        console.log(sub);
        s.send(JSON.stringify(sub));
    })
});

//For now I am initializing the database in the default route. We should eventually add a routes file similar to Tasks V5.
app.get("/", async (req, res) => {
  console.log("Request received at /");
  try {
    const model = await ModelFactory.getModel();
    await model.init();
    console.log("Database initialized and synced successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    return res.status(500).send("Server error during database setup.");
  }
  res.status(200).sendFile(path.join(__dirname, "../front-end/index.html"));
});

app.use(express.static(path.join(__dirname, "../front-end")));

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is successfully running on port ${PORT} (http://localhost:${PORT})`,
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

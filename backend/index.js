const express = require('express');
const cors = require("cors"); 
const path = require('path');
const ModelFactory = require('./model/ModelFactory.js');

const eventHub = require("./eventhub/EventHub");
const Events = require("./eventhub/Events.js");
const WebSocket = require("ws");

const app = express();
const spotifyRoutes = require("./query-spotify/spotify-routes.js");
const userRoutes = require("./routes/user-routes.js");
const PORT = 8888;

app.use(cors());

//app.use(cors());
app.use(express.json());
const songRoutes = require("./routes/feed-routes.js");
app.use("/feed", songRoutes);
app.use("/spotify", spotifyRoutes);
app.use("/user", userRoutes);
//app.use("/user", userRoutes);


//app.use(express.json());
//const songRoutes = require('./routes/feed-routes.js');
//app.use('/feed', songRoutes);
//app.use('/spotify', spotifyRoutes);

const summaryStatRoutes = require("./routes/trending-routes.js");
app.use("/trending", summaryStatRoutes);

const historyRoute = require("./routes/history-routes.js");
app.use("/history", historyRoute);

const socket = new WebSocket.Server({ port: 9000 });

socket.on("connection", (s) => {
  console.log("A client has connected.");
  //message to show that connection has been correctly established.
  s.on("message", (mes) => {
    console.log("Received from client: " + mes);
  });
  //essentially adding socket to the listeners of newSub event.
  eventHub.subscribe(Events.NewSub, (sub) => {
    console.log("Sending: ");
    console.log(sub);
    s.send(JSON.stringify(sub));
  });
});

// Initialize the database once at startup
(async () => {
  try {
    const model = await ModelFactory.getModel();
    await model.init(); // Initialize without resetting
    console.log("Database initialized and synced successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1); // Exit the process if database initialization fails
  }
})();

app.use(express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => {
  console.log("Request received at /");
  res.status(200).sendFile(path.join(__dirname, "../front-end/index.html"));
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is successfully running on port ${PORT} (http://localhost:${PORT})`,
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

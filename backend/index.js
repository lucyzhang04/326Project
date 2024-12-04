const express = require('express');
const path = require('path');
const ModelFactory = require('./model/ModelFactory.js');
const spotifyRoutes = require('./query-spotify/spotify-routes.js');
const app = express();
const PORT = 8888;

app.use(express.json());
const songRoutes = require('./routes/feed-routes.js');
app.use('/feed', songRoutes);
app.use('/spotify', spotifyRoutes);

//For now I am initializing the database in the default route. We should eventually add a routes file similar to Tasks V5.
app.get('/', async (req, res) => {
    console.log("Request received at /");
    try {
        const model = await ModelFactory.getModel(); 
        await model.init();
        console.log("Database initialized and synced successfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
        return res.status(500).send("Server error during database setup.");
    }
    res.status(200).sendFile(path.join(__dirname, '../front-end/index.html'));
});

app.use(express.static(path.join(__dirname, '../front-end')));

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is successfully running");
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
});


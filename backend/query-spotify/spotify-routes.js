const request = require("request");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fetch = require("node-fetch");
const ModelFactory = require("../model/ModelFactory.js");
const cors = require("cors");
const router = express.Router();

// Your Spotify API credentials
const client_id = "398a298f15a24856964bd8562cd93b16";
const client_secret = "3fb8cc68a3184950bfdc6d006dac94d3";
const redirect_uri = "http://localhost:8888/spotify/callback?"; // Your redirect URI

// http://localhost:8888/spotify/search?query_type=track&query_literal=sweet
// http://localhost:8888/spotify/login

// Helper function to generate random strings
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.use(cookieParser());

router.use(
  session({
    secret: generateRandomString(16),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, //how long cookie is valid (24 hours)(in milliseconds)
    },
  }),
);

router.get("/login", cors(),(req, res) => {
  console.log("=> /login");
  const scopes = [
    "user-read-private user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-modify",
    "user-library-read",
    "user-top-read",
    "user-read-recently-played",
    "user-follow-read",
    "user-follow-modify",
  ];
  const state = generateRandomString(16);

  //session cookies to store type & literal
  req.session.query_type = req.query.query_type;
  req.session.query_literal = req.query.query_literal;

  const authorizeURL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state,
    });

  res.redirect(authorizeURL);
});

// This handle being called by Spotify
router.get("/callback", (req, res) => {
  console.log("=> /callback");
  const code = req.query.code || null;

  let query_literal = req.session.query_literal;
  let query_type = req.session.query_type;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    console.log("=> /callback: post request");
    console.log("body: ", body);
    if (!error && response.statusCode === 200) {
      // Use the access token to access the Spotify Web API
      // Pass the token to the browser to make requests from there
      req.session.access_token = body.access_token;
      req.session.refresh_token = body.refresh_token;

      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${body.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          req.session.username = data.id;
        })
        .then(() => {
          fetch("http://localhost:8888/user/find_or_create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: req.session.username,
              spotify_refresh_token: req.session.refresh_token,
            }),
          });
        });

      // post request to user/find_or_create endpoint passing in username and refresh_token
      res.redirect(
        "/#" +
          new URLSearchParams({
            access_token: body.access_token,
            refresh_token: body.refresh_token,
          }),
      );
    } else {
      res.redirect(
        "/#" +
          new URLSearchParams({
            error: "invalid_token",
          }),
      );
    }
  });
});

router.get("/refresh_token", (req, res) => {
  console.log("=> /refresh_token");
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };
  //sends message to API
  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

router.get("/search", async (req, res) => {
  // front end should always just call search
  // if access_token already specified we simply perform query to spotify
  // if token is not present we initiate login sequence.
  // add parameter validation
  // check query_type for supported types - track, episode, show
  const supportedQueryTypes = ["track", "episode", "show"];

  let query_literal = req.query.query_literal || null;
  let query_type = req.query.query_type || null;

  // store user_name in session for compatibility purpose of teammate code.
  req.session.user_name = req.query.user_name;

  // getting access token from session cookie
  // "BQAhpeuKBkDSkKqb9aJb-hAQlG2q8NOId1eEsttZqWqorKoDhtzymAEpR2ActKhDpFPv0vbV7zEyB3Uee8jHiDXE4bOMTcPZ55H40C9MVKWAb4_CVe2typ7XWW3s9c7IoKgxCj6kWESj96qphpBjynFkXUwvwUUWHwtLdNJ_ZeB2on5joVXy2FvHw-8G7Fv6Pbw"
  let access_token = req.session.access_token || null;


  // if query_type or query_literal not set - we should return an error
  if (
    query_type === undefined ||
    !supportedQueryTypes.includes(query_type) ||
    query_literal === undefined ||
    query_literal.length === 0
  ) {
    // generate some kind of error
    console.log("=> /search: invalid search parameters");
    return res.redirect(
      "/#" +
        new URLSearchParams({
          error: "invalid_parameters",
        }),
    );
  }

  console.log("=> /search: " + query_literal);

  // if access token is not set initiate login
  if (access_token === null || access_token.length === 0) {
    return res.redirect(
      "/spotify/login?" +
        new URLSearchParams({
          query_literal: req.query.query_literal,
          query_type: req.query.query_type,
        }),
    );
  }

  console.log("search called with access token: " + access_token);

  async function fetchInformation(code) {

    console.log("=> fetchInformation");

    const searchURL =
      "https://api.spotify.com/v1/search?" +
      new URLSearchParams({
        q: query_literal,
        type: query_type,
      });

    const result = await fetch(searchURL, {
      method: "GET",
      headers: { Authorization: `Bearer ${code}` },
    });

    let spotifyRes = await result.json();

    console.log("<=fetchInformation");

    /*
    return query_type === "track"
      ? spotifyRes.tracks
      : query_type === "episode"
        ? spotifyRes.episodes
        : spotifyRes.shows;
     */
    return spotifyRes;
  }

  let items = await fetchInformation(access_token);

  console.log("<=search");

  res.json(items);

  res.end();

  return res;

});

//http://localhost:8888/spotify/get-user-playlists

router.get("/get-user-playlists", async (req, res) => {
  const accessToken = req.session.access_token;
  if (!accessToken) {
    return res.status(401).json({ 
      error: "Access token invalid in get-user-playlists"
    });
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }
    const data = await response.json();
    // Filters out invalid / null entries 
    const playlists = (data.items || [])
      .filter((playlist) => playlist && playlist.id && playlist.name) // Ensures playlist has valid id and valid name
      .map((playlist) => ({ // Retain only name and id of playlist
        id: playlist.id,
        name: playlist.name,
      }));

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching user playlists");
    res.status(500).json({ 
      error: "Failed fetching user playlists" 
    });
  }
});

router.get("/search-track", async (req, res) => {
  const title = req.query.title;
  const artist = req.query.artist;

  if (!title || !artist) {
    return res.status(400).json({ 
      error: "Title and artist not found" 
    });
  }

  try {
    const searchUrl =
      "https://api.spotify.com/v1/search?" +
      new URLSearchParams({
        q: `track:${title} artist:${artist}`,
        type: "track",
        limit: 1,
      });

    const accessToken = req.session.access_token;
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.tracks && data.tracks.items.length > 0) {
      const track = data.tracks.items[0];
      res.json({ id: track.id, name: track.name, artist: track.artists[0].name });
    } else {
      res.status(404).json({ 
        error: "Track not found" 
      });
    }
  } catch (error) {
    console.error("Error searching for track");
    res.status(500).json({ 
      error: "Failed while searching for track" 
    });
  }
});

async function addSongToPlaylist(req, trackId, playlistId) {
  const accessToken = req.session.access_token;

  if (!accessToken) {
    console.error("Access token not available :(");
    return { error: "Access token not available :'(" };
  }

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [`spotify:track:${trackId}`],
    }),
  });

  if (response.ok) {
    console.log("Song added to playlist yay!");
    return { success: true };
  } else {
    const errorText = await response.text();
    console.error("Error adding song to playlist");
    return { error: errorText };
  }
}

// Adds songs to a specific playlist
router.post("/add-to-playlist", async (req, res) => {
  const { trackId, playlistId } = req.body;

  try {
    const result = await addSongToPlaylist(req, trackId, playlistId);
    if (result.error) {
      return res.status(400).json(result);
    }
    res.status(200).json({ message: "Song added successfully :)" });
  } catch (err) {
    console.error("Error adding song to playlist");
    res.status(500).send({ 
      error: "Error adding song to playlist" 
    });
  }
});

module.exports = router;
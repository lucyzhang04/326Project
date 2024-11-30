const request = require('request');
const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = express.Router();

// Your Spotify API credentials
const client_id = '398a298f15a24856964bd8562cd93b16';
const client_secret = '3fb8cc68a3184950bfdc6d006dac94d3';
const redirect_uri = 'http://localhost:8888/spotify/callback?'; // Your redirect URI

// http://localhost:8888/spotify/search?query_type=track&query_literal=sweet

router.use(cookieParser());

router.use(session({
    secret: 'your-secret-key', // Replace with a strong, randomly generated secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000
    }
}));

router.get('/search',  async (req, res) =>{

    // front end should always just call search
    // if access_token already specified we simply perform query to spotify
    // if token is not present we initiate login sequence.
    // add parameter validation
    // check query_type for supported types - track, episode, show
    const supportedQueryTypes = ["track", "episode", "show"];

    let query_literal = req.query.query_literal || null;
    let query_type = req.query.query_type || null;

    // getting access token from session cookie 
    let access_token = req.session.access_token || null;

    // if query_type or query_literal not set - we should return an error
    if ( query_type === undefined || !supportedQueryTypes.includes(query_type) ||
         query_literal === undefined || query_literal.length === 0  ) {
        // generate some kind of error
        return res.redirect('/#' +
            new URLSearchParams({
                error: 'invalid_parameters'
            }));
    }

    // if access token is not set initiate login 
    if ( access_token === null || access_token.length === 0 )
    {
        return res.redirect('/spotify/login?' +
            new URLSearchParams({
                query_literal: req.query.query_literal,
                query_type: req.query.query_type
            }));
    }

    console.log("search called with access token"+access_token);

    async function fetchInformation(code) {
        const searchURL = 'https://api.spotify.com/v1/search?' +
            new URLSearchParams({
                q:  query_literal,
                type: query_type
            });

        const result = await fetch(searchURL, {
            method: "GET", headers: { Authorization: `Bearer ${code}` }
        });

        let spotifyRes = await result.json();

        return query_type === 'track' ? spotifyRes.tracks.items :
            (query_type === 'episode' ? spotifyRes.episodes.items : spotifyRes.shows.items);
    }

    let items = await fetchInformation(access_token);

    /*
    let songs = '';

    for (let i = 0; i < items.length; i++) {
        songs += '<p><b>Song</b>: '+items[i].name+' <b>Artist</b>: '+items[i].artists[0].name+'</p>';
    }

     */

//  console.log(songs);

   // let htmlPage = '<!DOCTYPE html><html lang="EN"><head><title>Song List</title></head><body><h1>Hello from Remind.Me</h1>'+songs+'</body></html>'

 //   res.send(htmlPage);

});

/*
router.get('/profile',  (req, res) =>{

    let access_token = req.query.access_token;

    console.log("profile called with access token"+access_token);


    async function fetchProfile(code) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${code}` }
        });

        res = await result.json();

        console.log('Display Name=' +res.display_name+' Country='+res.country );


        return result;
    }

    fetchProfile(access_token);
});
*/

router.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email';
    const state = generateRandomString(16);

    //session cookies to store type & literal
    req.session.query_type = req.query.query_type;
    req.session.query_literal = req.query.query_literal;

    const authorizeURL = 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
            state: state
        });

    res.redirect(authorizeURL);
});

// This handle being called by Spotify
router.get('/callback', (req, res) => {
    const code = req.query.code || null;

    let query_literal = req.session.query_literal;
    let query_type = req.session.query_type;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            // Use the access token to access the Spotify Web API
            // Pass the token to the browser to make requests from there

            req.session.access_token = body.access_token;
            req.session.refresh_token = body.refresh_token;

            res.redirect('/spotify/search?' +
                new URLSearchParams({
                    query_literal: query_literal,
                    query_type: query_type
                }));
        } else {
            res.redirect('/#' +
                new URLSearchParams({
                    error: 'invalid_token'
                }));
        }
    });
});

router.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };
    //sends message to API
    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

module.exports = router;

// Helper function to generate random strings
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
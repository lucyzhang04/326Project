const express = require('express');
const request = require('request');
const app = express();
const port = 8888;

// Your Spotify API credentials
const client_id = '398a298f15a24856964bd8562cd93b16';
const client_secret = '3fb8cc68a3184950bfdc6d006dac94d3';
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect URI

app.get('/search',  async (req, res) =>{

    let access_token = req.query.access_token;

    console.log("search called with access token"+access_token);


    async function fetchSongs(code) {
        const searchURL = 'https://api.spotify.com/v1/search?' +
            new URLSearchParams({
                q:  'Sweet Nothing',
                type: 'track'
            });

        const result = await fetch(searchURL, {
            method: "GET", headers: { Authorization: `Bearer ${code}` }
        });

        spotifyRes = await result.json();

        return spotifyRes.tracks.items;
    }

    items = await fetchSongs(access_token);

    let songs = '';

    for (let i = 0; i < items.length; i++) {
        songs += '<p><b>Song</b>: '+items[i].name+' <b>Artist</b>: '+items[i].artists[0].name+'</p>';
    }

//    console.log(songs);

    let htmlPage = '<!DOCTYPE html><html lang="EN"><head><title>Song List</title></head><body><h1>Hello from Remind.Me</h1>'+songs+'</body></html>'

    res.send(htmlPage);

});

app.get('/profile',  (req, res) =>{

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

app.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email';
    const state = generateRandomString(16);
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

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

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
            const access_token = body.access_token;
            const refresh_token = body.refresh_token;

            // Use the access token to access the Spotify Web API
            // ...


            // Pass the token to the browser to make requests from there
            res.redirect('/search?' +
                new URLSearchParams({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));

        } else {
            res.redirect('/#' +
                new URLSearchParams({
                    error: 'invalid_token'
                }));
        }
    });
});

app.get('/refresh_token', (req, res) => {
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

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});

// Helper function to generate random strings
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
const express = require('express')
const dotenv = require('dotenv');
let request = require('request');
const port = 8000

global.access_token = ''

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

var spotify_redirect_uri = 'http://localhost:3000/auth/callback'

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get('/auth/login', (req, res) => {

  var scope = "user-read-email user-read-private streaming user-read-playback-state user-modify-playback-state " +
      "playlist-modify-public playlist-modify-private"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

  var code = req.query.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post('https://accounts.spotify.com/api/token', authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // change back to access_token if issues are encountered
      global.access_token = body.access_token;
      res.redirect('/')
    }
  });

})

app.get('/auth/token', (req, res) => {
  res.json({access_token: access_token})
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

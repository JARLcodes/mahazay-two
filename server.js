'use strict';
const ltAuthService = require('./watson.config.js');
const express = require('express');
const app = express();
const expressBrowserify = require('express-browserify');
const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');


const isDev = app.get('env') === 'development';
app.use(express.static('public/'));

app.get(
  '/bundle.js',
  expressBrowserify('public/client.js', {
    watch: isDev,
    debug: isDev
  })
);



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;

app.listen(port, () => console.log(`Watson browserify example server running at http://localhost:%s/`, port));
'use strict';
const { ltAuthServiceTone } = require('./watson.config.js');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

module.exports = app;



const isDev = app.get('env') === 'development';

//is this other remote allowed to make this request? yes
app.use(cors({origin: true}));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

//get token middleware
app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthServiceTone.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

if (module === require.main){
  const port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;
  app.listen(port, () => console.log(`Watson browserify example server running at http://localhost:%s/`, port));
}

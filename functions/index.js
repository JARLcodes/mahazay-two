import { db } from '../src/utils/firebase.config';
const functions = require('firebase-functions');
const React = require('react');
const  App = require('./../src/App');
const express = require('express');

//without express all dynamic code could happen in onRequest callback, but we likely don't want entire server in one cb
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   response.send("Hello from firebase!")
// })

const app = express();

<<<<<<< HEAD

=======


app.get('**', (req, res) => {
  const html = renderToString(<App />);
  console.log('html: ', html);
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
})


app.get('/entries/:id', (req, res) => {
  console.log('here');
})
const ssrapp = functions.https.onRequest(app);
module.exports = ssrapp;
>>>>>>> e8fc19c39d1ca8fcffddf361527046d4a6f4343d

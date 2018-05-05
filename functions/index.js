const functions = require('firebase-functions');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const  App = require('./../src/App');
const express = require('express');

//without express all dynamic code could happen in onRequest callback, but we likely don't want entire server in one cb
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   response.send("Hello from firebase!")
// })

const app = express();

app.get('**', (req, res) => {
  const html = renderToString(<App />);
  console.log('html: ', html);
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
})

// app.get('/entries/:entryId', (req, res) => {

// })


const ssrapp = functions.https.onRequest(app);
module.exports = ssrapp;
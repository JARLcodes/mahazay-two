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



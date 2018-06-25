const firebase = require('firebase-admin');
firebase.initializeApp();
const db = firebase.firestore();
const { ltAuthServiceTone, ltAuthServicePersonality } = require('./watson.config.js');
const getPersonalityToken = () => new Promise((resolve, reject) => {
  ltAuthServicePersonality.getToken((err, data) => {
    if(err) return reject(err);
    return resolve(data);
  });
});
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const { convertFromRaw } = require('draft-js');

module.exports = app;

const isDev = app.get('env') === 'development';

//is this other remote allowed to make this request? yes
app.use(cors({origin: true}));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthServiceTone.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});


const analyzePersonality = (args) => {
  const token = args[0];
  const text = args[1];
  const personalityAnalyzer = new PersonalityInsightsV3({
    token,
    version_date: process.env.PERSONALITY_INSIGHTS_VERSION_DATE || "2017-10-13"
  });

  let params = {
    content: text,
    content_type: 'text/plain',
    raw_scores: true,
    consumption_preferences: true
  };

  return new Promise((resolve, reject) => {
    personalityAnalyzer.profile(params, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  })
};

const clean = obj => JSON.parse(JSON.stringify(obj))
const tap = msg => data => (console.log(msg, data), data)

app.get('/api/entries/:entryId/personalityInsights', (req, res, next) => {

  const text = db.collection('entries')
    .doc(req.params.entryId)
    .get()
    .then(snap => {
      if (snap.data()){
        if(snap.data().content) return convertFromRaw(snap.data().content).getPlainText()
        return null;
      }
      return null;
    })
    .catch(console.error)
  
  const token = getPersonalityToken();

  Promise.all([token, text])
    .then(tap('token, text, initialdata'))
    .then(analyzePersonality)
    .then(tap('personality data'))
    .then(data => db.collection('personalityInsights').doc(req.params.entryId).set(data))
    .then(() => res.status(200).send('ok'))
    .catch(next);
}) 

if (module === require.main){
  const port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;
  app.listen(port, () => console.log(`Watson browserify example server running at http://localhost:%s/`, port));
}

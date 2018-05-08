'use strict';
import { db } from './firebase.config.js';
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


export const  getTokenTone = () => {
  return fetch('/api/token/tone_analyzer').then(response => {
    return response.text();
  });
};

export const analyzeTone = (token, text, insightId) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    token,
    version: '2016-05-19',
  });
  
  toneAnalyzer.tone(
    { text },
    function(err, result) {
      if (err) {
        return console.log(err);
      }
      const insight = JSON.stringify(result, null, 2);
      db.collection('insights').doc(insightId.toString()).set(JSON.parse(insight));
    }
  );
};
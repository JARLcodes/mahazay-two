'use strict';
import { db } from './firebase.config.js';
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


export const  getTokenTone = () => {
  return fetch('/api/token/tone_analyzer').then(response => {
    return response.text();
  });
};

export const analyzeTone = (token, text, entryId, userId) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    token,
    version: '2016-05-19',
  });
  
  toneAnalyzer.tone(
    { text, sentences: false },
    function(err, result) {
      if (err) {
        return console.log(err);
      }
      const toneInsight = JSON.stringify(result, null, 2);
      const parsedToneInsight = JSON.parse(toneInsight)["document_tone"]["tone_categories"];
      db.collection('toneInsights').add({ parsedToneInsight, entryId, userId });
    }
  );
};

export const analyzePersonality = (entryId) => {
  return fetch(`/api/entries/${entryId}/personalityInsights`).then(response => response)
}
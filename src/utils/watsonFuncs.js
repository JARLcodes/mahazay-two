'use strict';
import { db } from './firebase.config.js';
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

export const  getTokenTone = () => {
  return fetch('/api/token/tone_analyzer').then(response => {
    return response.text();
  });
};

export const  getTokenPersonality = () => {
  return fetch('/api/token/personality_analyzer').then(response => {
    return response.text();
  });
};


export const analyzeTone = (token, text, toneInsightId) => {
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
      db.collection('toneInsights').doc(toneInsightId.toString()).set({ parsedToneInsight });
    }
  );
};

export const analyzePersonality = (token, text, personalityInsightId) => {
  // console.log(token)
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

  // console.log("personalityInsight: ", text)

  personalityAnalyzer.profile(params, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      // console.log("personalityInsight: ", result)
      const personalityInsight = JSON.stringify(result, null, 2);
      const parsedPersonalityInsight = JSON.parse(personalityInsight)//["personality"]["needs"]["values"]["behavior"]["consumption_preferences"];
      db.collection('personalityInsights').doc(personalityInsightId.toString()).set({ parsedPersonalityInsight });
    }
    // if (err) console.log('Error:', err);
    // else console.log(JSON.stringify(result, null, 2));
    // }
  });
};
'use strict';
import { db } from './firebase.config.js';
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


export const  getTokenTone = () => {
  return fetch('/api/token/tone_analyzer').then(response => {
    return response.text();
  });
};

export const analyzeTone = function (token, text, entryId, userId) {
  const toneAnalyzer = new ToneAnalyzerV3({
    token,
    version: '2016-05-19',
  });
 let self = this
  return toneAnalyzer.tone(
    { text, sentences: false },
    function(err, result) {
      if (err) {
        return console.log(err);
      }
      const toneInsight = JSON.stringify(result, null, 2);
      console.log("toneInsightOrig: ", result)
      const parsedToneInsight = JSON.parse(toneInsight)["document_tone"]["tone_categories"];
      db.collection('toneInsights').doc("Tone Test 3").set({ parsedToneInsight, entryId, userId });
      let insight = { parsedToneInsight, entryId, userId }
      console.log("this is the insight object inside watson Funcs:", insight)
      self.setState({insight}, ()=> {console.log(self.state)})
    }
  );


};

// export const analyzeToneSummary = (token, text, userId) => {
//   const toneAnalyzer = new ToneAnalyzerV3({
//     token,
//     version: '2016-05-19',
//   });

//   toneAnalyzer.tone(
//     { text, sentences: false },
//     function(err, result) {
//       if (err) {
//         return console.log(err);
//       }
//       const toneInsight = JSON.stringify(result, null, 2);
//       const parsedToneInsight = JSON.parse(toneInsight)["document_tone"]["tone_categories"];
//       db.collection('toneSummary').doc(userId).set({ parsedToneInsight, userId });
//     }
//   );
// };

export const analyzePersonality = (entryId, userId) => {
  return fetch(`/api/entries/${entryId}/personalityInsights`, {userId}).then(response => response)
}

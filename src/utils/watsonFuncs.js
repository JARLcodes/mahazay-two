'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


export const  getToken = () => {
  return fetch('/api/token/tone_analyzer').then(response => {
    return response.text();
  });
};

export const analyze = (token, text) => {
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
      console.log(JSON.stringify(result, null, 2));
    }
  );
};
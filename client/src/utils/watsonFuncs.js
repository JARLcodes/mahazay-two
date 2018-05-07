'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const btn = document.getElementById('analyze-btn');
const input = document.getElementById('input');
const output = document.getElementById('output'); 

export const  getToken = function() {
  return fetch('/api/token/tone_analyzer').then(function(response) {
    return response.text();
  });
};

export const analyze = function (token, text) {
  const toneAnalyzer = new ToneAnalyzerV3({
    token: token,
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
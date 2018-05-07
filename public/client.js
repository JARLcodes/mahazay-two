'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const btn = document.getElementById('analyze-btn');
const input = document.getElementById('input');
const output = document.getElementById('output');

/**
 * @return {Promise<String>} returns a promise that resolves to a string token
 */
function getToken() {
  return fetch('/api/token/tone_analyzer').then(function(response) {
    return response.text();
  });
}

function analyze(token) {
  const toneAnalyzer = new ToneAnalyzerV3({
    token: token,
    version: '2016-05-19',
  });
  toneAnalyzer.tone(
    {
      text: input.value,
    },
    function(err, result) {
      if (err) {
        output.innerHTML = err;
        return console.log(err);
      }
      output.innerHTML = JSON.stringify(result, null, 2);
    }
  );
}

btn.onclick = function() {
  getToken().then(analyze);
};

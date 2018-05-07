const watson = require('watson-developer-cloud');
const ltAuthService = new watson.AuthorizationV1({
  url: "https://gateway.watsonplatform.net/tone-analyzer/api",
  username: process.env.TONE_ANALYZER_USERNAME || "c2c04fe7-005f-4600-93ea-8b4b63e13c4d",
  password: process.env.TONE_ANALYZER_PASSWORD || "nHBcWngNhLUD"
});

module.exports = ltAuthService;
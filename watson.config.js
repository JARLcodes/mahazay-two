const watson = require('watson-developer-cloud');

const ltAuthService = new watson.AuthorizationV1({
  url: "https://gateway.watsonplatform.net/tone-analyzer/api",
  username: process.env.TONE_ANALYZER_USERNAME || "b05c5422-427d-4ca9-98a2-85adf93db7b4",
  password: process.env.TONE_ANALYZER_PASSWORD || "GzTNCoJ8pH2G"
});

module.exports = ltAuthService;
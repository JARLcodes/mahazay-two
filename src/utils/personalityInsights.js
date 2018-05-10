require("dotenv").config();
const readline = require('readline')
const PersonalityInsightsV3 =require('watson-developer-cloud/personality-insights/v3');
const personality_insights = new PersonalityInsightsV3({
    username: process.env.PERSONALITY_ANALYZER_USERNAME || "8112b64d-ae2e-42e6-9af1-4f9d95f6024a",
    password: process.env.PERSONALITY_ANALYZER_PASSWORD || "GNpWmf2gIVjR",
    version_date: process.env.PERSONALITY_INSIGHTS_VERSION_DATE || "2017-10-13"
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter a short paragraph for Watson to analyze...', (text) => {

    let params = {
        content: text,
        content_type: 'text/plain',
        raw_scores: true,
        consumption_preferences: true
    };

    personality_insights.profile(params, function(error, response) {
        if (error) console.log('Error:', error);
        else console.log(JSON.stringify(response, null, 2));
    });

    rl.close();
});
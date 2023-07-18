const Twitter = require("twitter-lite-v2");

require("dotenv").config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

async function twtPost() {
  try {
    await client.post("statuses/update", { status: "hi!" });
  } catch (err) {
    console.error(err);
  }
}

// this is the usage of the twitter api to post a single thread 


module.exports = { twtPost };




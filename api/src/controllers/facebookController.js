const fb = require("fb");
require("dotenv").config();

const PAGE_ID = "";

const getLongLivedToken = async () => {
  fb.setAccessToken(process.env.ACCESS_TOKEN);
  const response = await fb.api("oauth/access_token", {
    grant_type: "fb_exchange_token",
    client_id: process.env.APP_ID,
    client_secret: process.env.APP_SECRET,
    fb_exchange_token: process.env.ACCESS_TOKEN,
  });

  const longLivedToken = response.access_token;
  fb.setAccessToken(longLivedToken);
  return longLivedToken;
};

const postToFacebook = async (message) => {
  const longLivedToken = await getLongLivedToken();

  fb.options({
    accessToken: longLivedToken,
  });

  fb.api(`/${PAGE_ID}/feed`, "post", { message }, function (response) {
    if (!response || response.error) {
      console.log(response.error);
    } else {
      console.log("Post ID: " + response.id);
    }
  });
};

module.exports = {
  postToFacebook,
};

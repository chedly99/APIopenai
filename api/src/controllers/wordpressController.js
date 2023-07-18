const axios = require("axios");

const postToWordpress = async (title, post) => {
  // should be stored in dotenv
  const ourPassword = "";
  const ourUsername = "";

  const authHeader = `Basic ${Buffer.from(
    `${ourUsername}:${ourPassword}`
  ).toString("base64")}`;

  const postData = {
    title: title,
    content: post,
    status: "publish",
  };

  try {
    const response = await axios.post(
      "https://chat-gpt.diginov.tech/wordpress/wp-json/wp/v2/posts",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );
    
    return response.data
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { postToWordpress };

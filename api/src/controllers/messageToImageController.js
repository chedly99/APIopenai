const { OpenAIApi, Configuration } = require("openai");

const { postToInstagram } = require("../controllers/instagramController");

require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.API_IMAGE_TOKEN,
});

const openai = new OpenAIApi(config);

const generateImage = async (title) => {
  try {
    const response = await openai.createImage({
      model: "image-alpha-001",
      prompt: title,
      n: 1,
      size: "1024x1024",
    });

    const generatedImage = await response.data.data[0].url;
    
    const pub = await postToInstagram(generatedImage, title);
    console.log("22222", pub);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateImage };

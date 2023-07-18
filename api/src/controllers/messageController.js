const { OpenAIApi, Configuration } = require("openai");
const { postToFacebook } = require("../controllers/facebookController");
const { postToWordpress } = require("../controllers/wordpressController");
const { generateImage } = require("../controllers/messageToImageController");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);

const generateText = async (req, res) => {
  try {
    console.log(req.body);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0.2,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1024,
    });

    const generatedText = response.data.choices[0].text;
    console.log(generatedText);

    // const ig = await postToInstagram();
     const gen = await generateImage(req.body.prompt, generatedText);
     postToFacebook(generatedText);
     const result = await postToWordpress(req.body.prompt, generatedText);
     console.log(result);
    res.send({ generatedText, result, gen });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { generateText };

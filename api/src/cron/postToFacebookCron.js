const cron = require("node-cron");
const { postToFacebook } = require("../controllers/facebookController");
const { generateText } = require("../controllers/messageController");

const task = cron.schedule(
  "*/10 * * * * *",
  async () => {
    try {
    const message = await generateText();
    await postToFacebook(message);
    } catch (error) {
      console.log(error)
    }
  },
  {
    scheduled: true,
  }
);

module.exports = { task };

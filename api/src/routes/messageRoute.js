const messageRoute = require("express").Router();
const { generateText } = require("../controllers/messageController");

messageRoute.route("/postMessage").post(generateText);

// the controller Route that will be handled in the main app index

module.exports = messageRoute;

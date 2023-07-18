const imageRoute = require("express").Router();
const { generateImage } = require("../controllers/messageToImageController");

imageRoute.route("/postImage").post(generateImage);

// the controller Route that will be handled in the main app index

module.exports = imageRoute;

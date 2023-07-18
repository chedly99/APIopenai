const instagramRoute = require("express").Router();
const { postToInstagram } = require("../controllers/instagramController");

instagramRoute.route("/posttoig").post(postToInstagram);

// the controller Route that will be handled in the main app index

module.exports = instagramRoute;

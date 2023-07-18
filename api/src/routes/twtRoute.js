const twtRoute = require("express").Router();
const { twtPost } = require("../controllers/twtController");

twtRoute.route("/statuses/update").post(twtPost);

// the controller Route that will be handled in the main app index

module.exports = twtRoute;

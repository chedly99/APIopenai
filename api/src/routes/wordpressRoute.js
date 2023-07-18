const wordpressRoute = require("express").Router();
const { postToWordpress } = require("../controllers/wordpressController");

wordpressRoute.route("/postWordpress").post(postToWordpress);

module.exports = wordpressRoute;

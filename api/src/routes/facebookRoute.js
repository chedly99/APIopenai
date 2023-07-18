const facebookRoute = require("express").Router();
const { postToFacebook } = require("../controllers/facebookController");

facebookRoute.route("/posttofb").post(postToFacebook);

// the controller Route that will be handled in the main app index

module.exports = facebookRoute;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const messageRoute = require("./src/routes/messageRoute");
const twtRoute = require("./src/routes/twtRoute");
const facebookRoute = require("./src/routes/facebookRoute");
const instagramRoute = require("./src/routes/instagramRoute");
const wordpressRoute = require("./src/routes/wordpressRoute")
const { task } = require("./src/cron/postToFacebookCron");
const imageRoute = require("./src/routes/imageRoute");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", messageRoute);
app.use(twtRoute);
app.use(facebookRoute);
app.use(instagramRoute);
app.use("/api", wordpressRoute)
app.use(imageRoute)

task.stop();

app.listen(5000, () => console.log("Listening on port 5000"));

module.exports = app;

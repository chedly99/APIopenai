const { IgApiClient } = require("instagram-private-api");
const { readFile } = require("fs").promises;
const sharp = require("sharp");
const request = require('request');
const fs = require('fs');

 const username = "";
 const password = "";

const ig = new IgApiClient();

const postToInstagram = async (image, title) => {
  try {
     ig.state.generateDevice(username);
     await ig.account.login(username, password);
     console.log("Logged in to Instagram");
      
    const imageUrl = image ;

    const timestamp = new Date().getTime();
    const imagePath = `./src/media/newgen${timestamp}.jpeg`;

    

    await downloadImage(imageUrl, imagePath);

    const imageBuffer = await readFile(imagePath);

    const resizedImageBuffer = await sharp(imageBuffer)
      .resize( 300 )
      .toBuffer();

    const publishResult = await ig.publish.photo({
      file: resizedImageBuffer,
      caption: title,
    });

    return publishResult
  } catch (err) {
    console.log(err, "errrrrr");
  }
};

const downloadImage = (imageUrl, imagePath) => {
  return new Promise((resolve, reject) => {
    request(imageUrl)
      .on("error", (error) => reject(error))
      .pipe(fs.createWriteStream(imagePath))
      .on("close", () => {
        console.log("Image saved to", imagePath);
        resolve();
      })
      .on("error", (error) => reject(error));
  });
};


module.exports = {
  postToInstagram,
};

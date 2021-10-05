const path = require('path');
const fs = require('fs')

module.exports = function (db, app, ObjectID) {
  app.get("/api/getImage/:username", function (req, res) {
    const username = req.params.username;
    console.log(username);
    const imageName = "avatar.png";
    const imagePath = path.join(__dirname, "../upload", imageName);

    if(fs.existsSync(imagePath)) {
         res.sendFile(imagePath);
    } else {
        res.status(400).send("Error: Image does not exists");
    }
  });
};

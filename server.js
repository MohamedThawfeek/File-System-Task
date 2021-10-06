const express = require("express");

const app = express();

const fs = require("fs");

const path = require("path");

if (!fs.existsSync("temp")) {
  fs.mkdirSync("temp");
  fs.writeFile(path.resolve("temp", "data.txt"), " Hello World", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File Created");
  });
} else {
  console.log("File already exsisted");
}

function middleMan(req, res, next) {
  console.log("I am Middle Man");
  next();
}

app.use(middleMan);

app.get("/user", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp", "data.txt"));
});

app.post("/", (req, res) => {
  res.send("This is post route");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});

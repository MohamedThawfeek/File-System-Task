const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("Hitting");
});

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

app.get("/data", (req, res) => {
  app.use("/temp", express.static("temp"));
  const date = new Date().toLocaleString();

  fs.open(`${__dirname}/files/${date} data.txt`, "w", function (err) {
    if (err) throw err;
    res.send("file created");
  });
});

app.listen(5000, () => {
  console.log("Server is Up");
});

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded(true));
app.use(express.static("frontend/public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/projects", (req, res) => {
  res.render("profolio.ejs");
});

app.listen(port, (req, res) => {
  console.log(`Listening port ${port}....`);
});

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;
const db = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: "Message",
  password: process.env.POSTGRES_PASS,
  port: process.env.POSTGRES_PORT,
});

app.use(bodyParser.urlencoded(true));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { currentPage: "home" });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { currentPage: "about" });
});

app.get("/projects", (req, res) => {
  res.render("profolio.ejs", { currentPage: "profolio" });
});

app.get("/preview", (req, res) => {
  res.render("resume.ejs", { currentPage: "profolio" });
});

app.get("/message", async (req, res) => {
  let message = req.query;

  try {
    const result = await db.query(
      "INSERT INTO message (name, phone, email, message) VALUES ($1, $2, $3, $4)",
      [message.name, message.phone, message.email, message.message]
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }

  res.redirect("/");
});

app.listen(port, (req, res) => {
  console.log(`Listening port ${port}....`);
});

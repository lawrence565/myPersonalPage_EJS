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

  const date = new Date();
  const day = `${date.getFullYear()}-${
    date.getMonth() < 10 ? "0" + date.getMonth().toString() : date.getMonth()
  }-${date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate()}`;
  const time = `${date.getHours()}:${
    date.getMinutes() < 10
      ? "0" + date.getMinutes().toString()
      : date.getSeconds()
  }:${
    date.getSeconds() < 10
      ? "0" + date.getSeconds().toString()
      : date.getSeconds()
  }`;
  console.log("日期與時間為：", day, time);

  try {
    const result = await db.query(
      "INSERT INTO message (name, phone, email, message, date, time) VALUES ($1, $2, $3, $4, $5, $6)",
      [message.name, message.phone, message.email, message.message, day, time]
    );
  } catch (e) {
    console.log(e);
  }

  res.redirect("/");
});

app.get("/received", async (req, res) => {
  let data;

  try {
    const result = await db.query("SELECT * FROM message");
    data = result.rows;
  } catch (e) {
    console.log(e);
  }
  res.render("message.ejs", {
    messages: data,
    currentPage: "home",
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening port ${port}....`);
});

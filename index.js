import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const port = 3000;

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

app.post("/message", (req, res) => {
  let message = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${message.email}`,
    to: process.env.EMAIL_USER,
    subject: `Message from ${message.name}`,
    text: `You have a new message from ${message.name}.\nThe message is ${message.message}. \n\nHere is the contact:\nPhone: ${message.tel}\nName: ${message.name}\nEmail: ${message.email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    console.log("Email sent: " + info.response);
    res.status(200).redirect("/");
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening port ${port}....`);
});

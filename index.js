const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cors());
console.log(process.env.MY_EMAIL);
const smtpConfig = {
  //   service: "hotmail",
  host: "smtp-mail.live.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

function sendMail(data) {
  const mailOptions = {
    from: data.email,
    to: "eugeneahulu15@live.com",
    subject: "Test",
    text: data.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.post("/contact", async (req, res) => {
  const mailOptions = {
    from: req.body.email,
    to: "eugeneahulu15@live.com",
    subject: "Test",
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent");
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

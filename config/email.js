const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: process.env.HOSTMAIL,
  port: process.env.PORTMAIL,
  secure: false,
  auth: {
    type: "OAuth2",
    user: process.env.MAILUSER,
    accessToken: process.env.MAILPASS,
  },
});

module.exports = transporter;

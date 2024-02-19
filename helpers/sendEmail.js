const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILTRAP_USER, MAILTRAP_PASS } = process.env;

const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "ovelikoshich@gmail.com" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;

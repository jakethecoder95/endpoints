const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY
    }
  })
);

exports.cutterConstruction = async (req, res, next) => {
  const { name, email, message, subject, phone } = req.body;
  try {
    const response = await transporter.sendMail({
      to: "cuttercon11@gmail.com",
      from: email,
      subject: subject,
      html: `
        <h3>Message from ${name}...</h3>
        <p>${message}</p>
        <p>Phone number: ${phone}</p>
      `
    });
    res.status(200).json({
      msg: "success",
      response
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

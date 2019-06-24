const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// const { SENDGRID_KEY } = require("../secrets");

const api_key = process.env.SENDGRID_KEY;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY /* || SENDGRID_KEY */
    }
  })
);

exports.cutterConstruction = async (req, res, next) => {
  const { name, email, message, subject, phone } = req.body;
  try {
    const response = await transporter.sendMail({
      to: "95jacob07@gmail.com",
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
      response: API_KEY
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

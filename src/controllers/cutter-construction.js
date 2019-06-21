const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const { SENDGRID_KEY } = require("../secrets");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);

exports.cutterConstruction = async (req, res, next) => {
  const { name, email, message, subject, number } = req.body;
  try {
    const response = await transporter.sendMail({
      to: "95jacob07@gmail.com",
      from: email,
      subject: subject,
      html: `
        <h3>${name},</h3>
        <p>${message}</p>
        <p>Phone number: ${number}</p> 
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

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
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
      response
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

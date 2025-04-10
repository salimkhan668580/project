const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salimkhan668580s@gmail.com",
    pass: "gvgu qfca xals xoju", // ⚠️ NOT your Gmail password
  },
});

async function sendEmail(userEmail, Otp) {
  const info = await transporter.sendMail({
    from: '"Your App" <salimkhan668580s@gmail.com>',
    to: userEmail,
    subject: "Your Registration OTP",
    html: `<p>Your OTP is <b>${Otp}</b></p>`,
  });

  console.log("Email sent: %s", info.messageId);
}

module.exports = sendEmail;

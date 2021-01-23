import nodemailer from 'nodemailer';

export async function sendEmail(email: string, code: string) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alvincarter717@gmail.com',
      pass: 'Alvin717@',
    },
  });

  var mailOptions = {
    from: 'Alvin Carter <alvincarter717@gamil.com>',
    to: email,
    subject: `${code} is your Twelfish verification code`,
    text: 'Confirm your email address.',
    html: `<h3>${code}</h3>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}
const nodemailer = require("nodemailer");

const sendVerificationMail = (Email,Username) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ajayjamage3@gmail.com",
      pass: "kwmgocotyirvdfxk",
    },
  });

  
  transporter
    .sendMail({
      to: Email,
      from: "ajayjamage3@gmail.com",
      subject: "Verification needed",
      text: "Fro Ajay",
      html: `
        <h1>Hello ${Username}</h1>
               
      `,
    })
    .then((info) => {
      console.log(info.response);
      console.log("Mail sent User.");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports={
    sendVerificationMail
}
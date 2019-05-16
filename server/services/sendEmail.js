const nodemailer = require("nodemailer");
// const emailer = require("../emailTemplates/inviteEmail");
const keys = require("../config/keys");

const mongoose = require("mongoose");
const Bet = mongoose.model("bets");

module.exports = async function main(req, emailTemplate) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport

  console.log("req in sendemail: ", req);
  const { value, comment, loggedInUserGoogleId, id, email, endDate } = req.body;
  const bet = await new Bet({
    amount: value,
    comment: comment,
    dateCreated: Date.now(),
    accepted: false,
    againstId: loggedInUserGoogleId,
    user: id,
    againstEmail: email,
    endDate: endDate
  });
  bet
    .save()
    .then(res => {
      let template = emailTemplate(req.body, res._id);
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: keys.gmailAccount, // generated ethereal user
          pass: keys.gmailPassword // generated ethereal password
        }
      });

      // send mail with defined transport object
      transporter.sendMail({
        from: '"Shafie inc 👻" <danshafie@gmail.com>', // sender address
        to: "danshafie@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Some title", // plain text body
        html: template, // html body
        attachments: [
          {
            filename: "1ou6ze.jpg",
            path: __dirname + "/../images/1ou6ze.jpg",
            cid: "cute-image@cid"
          }
        ]
      });
    })
    .catch(err => {
      console.log("theres an eror: ", err);
    });
  main().catch(console.error);
};

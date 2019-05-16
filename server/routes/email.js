const nodemailer = require("nodemailer");
const inviteEmailTemplate = require("../emailTemplates/inviteEmail");
const responeEmailTemplate = require("../emailTemplates/inviteEmail");
const keys = require("../config/keys");
const sendEmail = require("../services/sendEmail");

const mongoose = require("mongoose");
const Bet = mongoose.model("bets");

module.exports = app => {
  app.post("/send-email", (req, res) => {
    res.json({ hi: "babe" });
    // const emailTemplate = emailer(req.body);
    console.log("req in send email: ", req);
    sendEmail(req, inviteEmailTemplate);

    // async function main() {
    //   // Generate test SMTP service account from ethereal.email
    //   // Only needed if you don't have a real mail account for testing

    //   // create reusable transporter object using the default SMTP transport
    //   const bet = await new Bet({
    //     amount: req.body.value,
    //     comment: req.body.comment,
    //     dateCreated: Date.now(),
    //     accepted: false,
    //     againstId: req.body.loggedInUserGoogleId,
    //     user: req.body.id,
    //     againstEmail: req.body.email,
    //     endDate: req.body.endDate
    //   });
    //   bet
    //     .save()
    //     .then(res => {
    //       let emailTemplate = emailer(req.body, res._id);
    //       let transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //           user: keys.gmailAccount, // generated ethereal user
    //           pass: keys.gmailPassword // generated ethereal password
    //         }
    //       });

    //       // send mail with defined transport object
    //       transporter.sendMail({
    //         from: '"Shafie inc 👻" <danshafie@gmail.com>', // sender address
    //         to: "danshafie@gmail.com", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Some title", // plain text body
    //         html: emailTemplate, // html body
    //         attachments: [
    //           {
    //             filename: "1ou6ze.jpg",
    //             path: __dirname + "/../images/1ou6ze.jpg",
    //             cid: "cute-image@cid"
    //           }
    //         ]
    //       });
    //     })
    //     .catch(err => {
    //       console.log("theres an eror: ", err);
    //     });
    // }

    // main().catch(console.error);
  });

  app.post("/email-confirmation", async (req, res) => {
    console.log("req body in email confirmation: ", req.body);
    const response = await Bet.findByIdAndUpdate(
      req.body.id,
      {
        accepted: req.body.acceptedParam
      },
      { new: true }
    );

    console.log("respone: ", response);
    sendEmail(response, responeEmailTemplate);
  });
};

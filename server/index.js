const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const emailer = require("./services/email");
require("./models/User.js");
require("./models/Bet.js");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/email")(app);

// app.post("/send-email", (req, res) => {
//   console.log("req in send email: ", req.body);
//   res.json({ hi: "babe" });
//   const emailTemplate = emailer(req.body);
//   async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: keys.gmailAccount, // generated ethereal user
//         pass: keys.gmailPassword // generated ethereal password
//       }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Shafie inc 👻" <danshafie@gmail.com>', // sender address
//       to: "danshafie@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world123?", // plain text body
//       html: emailTemplate, // html body
//       attachments: [
//         {
//           filename: "1ou6ze.jpg",
//           path: __dirname + "/images/1ou6ze.jpg",
//           cid: "cute-image@cid"
//         }
//       ]
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }

//   main().catch(console.error);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT);

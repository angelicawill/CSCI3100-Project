require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const url = 'http://localhost:5000/confirmation/${emailToken}';
var mailOptions = {
  from: 'teamfindtutor@gmail.com',
  to: 'UserAccount@gmail.com', your FindTutor account',
  text: 'Please click this link to verify your account:  <a href="${url}">${url}</a>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
const nodemailer = require('nodemailer');
require('dotenv').config();
const port = process.env.PORT;

function sendmail(email, token) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'tovmasyanmher70@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `click http://localhost:3001/verify/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {sendmail}
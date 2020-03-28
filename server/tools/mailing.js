'use strict';
const nodemailer = require('nodemailer');



module.exports = {
    sendMail(subject, html) {
        const to = process.env.APP_MAIL_RECEIVER
        const sender = process.env.APP_MAIL_SENDER

        let smtpConfig = {
            host: 'smtp.live.com',
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: sender,
                pass: process.env.APP_MAIL_SENDER_PASSWORD
            }
        };
        let transporter = nodemailer.createTransport(smtpConfig)

        html += `<br><br>Send by 👻 ${sender}`

        // setup email data
        let mailOptions = {
            from: `"👻" <${sender}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            //text: text, // plain text body
            html
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    }
}
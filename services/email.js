const nodemailer = require('nodemailer');
require('dotenv').config();

// function sendMail({from ,to, subject,text,html}){
//     let transporter = nodemailer.createTransport({
//         host : process.env.SMTP_HOST,
//         port : process.env.SMTP_PORT,
//         secure:  false,
//         auth : {

//             user : process.env.SMTP_USER,
//             pass : process.env.SMTP_PASSWORD,
//          }
//     });

//        // sending mails

//         let info = transporter.sendMail({
//             from : `dShare <${from}>`,
//             to: to,
//             subject : subject,
//             text : text,
//             html : html
//         });
// }


const mailer = (email, otp) => {
    const sendMail = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            secure:  false,
            auth : {
    
                user : process.env.SMTP_USER,
                pass : process.env.SMTP_PASSWORD,
             }
      });
      
      const mailOptions = {
         from: 'deepakkumarchouhan272@gmail.com',
         to: 'dk397787@gmail.com',
         subject: 'Mail sent to reset password',
         html: '<h1>Reset Password</h1>'
      }
      
      sendMail.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
      });
}






module.exports = mailer;
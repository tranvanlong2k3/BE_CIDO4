require('dotenv').config();
import nodemailer from 'nodemailer';
import user from '../models/user';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Booking Care👻" <tranvanlong4072003@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lệnh khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            ` 
  <h3>Xin chào ${dataSend.patientName}!</h3>
  <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh online trên website Booking Care</p>
  <p>Thông tin đặt lịch khám bệnh: </p>
  <div><b>Thời gian: ${dataSend.time}</b></div>
  <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
  
  <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới 
      để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
  </p>
  <div>
    <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
  </div>

  <div>Xin chân thành cảm ơn!</div>
  `
    }
    if (dataSend.language === 'en') {
        result =
            ` 
  <h3>Dear ${dataSend.patientName}!</h3>
  <p>You received this email because you booked an online appointment on the Booking Care website</p>
  <p>Medical appointment information: </p>
  <div><b>Time: ${dataSend.time}</b></div>
  <div><b>Doctor: ${dataSend.doctorName}</b></div>
  
  <p>If the above information is true, please click on the link below 
      to confirm and complete the procedure for booking a medical appointment.
  </p>
  <div>
    <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
  </div>

  <div>Thank you very much!</div>
  `
    }

    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            ` 
  <h3>Xin chào ${dataSend.patientName}!</h3>
  <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh online trên website Booking Care</p>
  <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm.</p>

  <div>Xin chân thành cảm ơn!</div>
  `
    }
    if (dataSend.language === 'en') {
        result =
            ` 
  <h3>Dear ${dataSend.patientName}!</h3>
  <p>You received this email because you booked an online appointment on the Booking Care website</p>
  <p>Prescription/invoice information is sent in the attached file.</p>

  <div>Thank you very much!</div>
  `
    }

    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            //create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, //true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, //generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, //generated ethereal password
                },
            });

            //send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Booking Care👻" <tranvanlong4072003@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {   //encoded string as an attachment
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    },
                ],
            });

            resolve(true)

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}
require('dotenv').config();
import nodemailer from 'nodemailer';

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
      html: `
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
      `, // html body
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}
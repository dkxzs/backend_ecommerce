import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  let listItem = "";
  const attachImage = [];
  orderItems.forEach((item) => {
    listItem += `
    <div>
        <div>
            Bạn đã đặt sản phẩm ${item.name} với số lượng: <b>${
      item.amount
    }</b> 
            với giá là: <b>${item.price * (1 - item.discount / 100)}</b>
        </div>
        
    </div>
    `;
    attachImage.push({ path: item.image });
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "hadkxz@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng tại s-shop", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại s-shop</b></div> ${listItem}`, // html body
    attachments: attachImage,
  });
};

export { sendEmailCreateOrder };

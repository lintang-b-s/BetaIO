import nodemailer from 'nodemailer';
import {config} from '../../config.js';
import Mustache from 'mustache';
import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import fs from 'fs';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.gmail,
    pass: config.password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync('views/email/otp.html', 'utf8');

    let message = {
      from: config.gmail,
      to: email,
      subject: 'Otp for registration is: ',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message); 
  } catch (ex) {
    console.log(ex);
  }
};

const invoiceMail = async (email, data) => {
  try {
    let template = fs.readFileSync('views/email/invoice.html', 'utf8');

    let message = {
      from: config.gmail,
      to: email,
      subject: 'invoice for order is: ',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message); 
  } catch (ex) {
    console.log(ex);
  }
};

const ticketMail = async (email, data) => {
  
  try {
    const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

    let template = fs.readFileSync('views/email/ticket.html', 'utf8');
    await page.setContent(Mustache.render(template, data),{ waitUntil: 'domcontentloaded' })
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({
      path: 'result.pdf',
      printBackground: true,
      preferCSSPageSize: true,
     
    });

    let message = {
      from: config.gmail,
      to: email,
      subject: 'ticket for order is: ',
      html: Mustache.render(template, data),
     
    };

    console.log('data yang akan di render di ticket:' , data);


   
    return await transporter.sendMail(message); 
  } catch (ex) {
    console.log(ex);
  }
};
const __dirname = path.resolve();

// const ticketMail = (receiver, content) => {
//   ejs.renderFile(__dirname + '/views/email/ticket.ejs', { receiver, content }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       var mailOptions = {
//         from: config.gmail,
//       to: receiver,
//       subject: 'ticket for order is: ',
//         html: data
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//       });
//     }
//   });
// };



export { otpMail , invoiceMail, ticketMail};

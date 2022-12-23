"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ticketMail = exports.invoiceMail = exports.otpMail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _config = require("../../config.js");

var _mustache = _interopRequireDefault(require("mustache"));

var _ejs = _interopRequireDefault(require("ejs"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transporter = _nodemailer["default"].createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  // true for 465, false for other ports
  auth: {
    user: _config.config.gmail,
    pass: _config.config.password
  }
});

var otpMail = function otpMail(email, data) {
  var template, message;
  return regeneratorRuntime.async(function otpMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          template = _fs["default"].readFileSync('views/email/otp.html', 'utf8');
          message = {
            from: _config.config.gmail,
            to: email,
            subject: 'Otp for registration is: ',
            html: _mustache["default"].render(template, data)
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(transporter.sendMail(message));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.otpMail = otpMail;

var invoiceMail = function invoiceMail(email, data) {
  var template, message;
  return regeneratorRuntime.async(function invoiceMail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          template = _fs["default"].readFileSync('views/email/invoice.html', 'utf8');
          message = {
            from: _config.config.gmail,
            to: email,
            subject: 'invoice for order is: ',
            html: _mustache["default"].render(template, data)
          };
          _context2.next = 5;
          return regeneratorRuntime.awrap(transporter.sendMail(message));

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.invoiceMail = invoiceMail;

var ticketMail = function ticketMail(email, data) {
  var browser, page, template, pdf, message;
  return regeneratorRuntime.async(function ticketMail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_puppeteer["default"].launch());

        case 3:
          browser = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(browser.newPage());

        case 6:
          page = _context3.sent;
          template = _fs["default"].readFileSync('views/email/ticket.html', 'utf8');
          _context3.next = 10;
          return regeneratorRuntime.awrap(page.setContent(_mustache["default"].render(template, data), {
            waitUntil: 'domcontentloaded'
          }));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(page.emulateMediaType('screen'));

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(page.pdf({
            path: 'result.pdf',
            printBackground: true,
            preferCSSPageSize: true
          }));

        case 14:
          pdf = _context3.sent;
          message = {
            from: _config.config.gmail,
            to: email,
            subject: 'ticket for order is: ',
            html: _mustache["default"].render(template, data)
          };
          console.log('data yang akan di render di ticket:', data);
          _context3.next = 19;
          return regeneratorRuntime.awrap(transporter.sendMail(message));

        case 19:
          return _context3.abrupt("return", _context3.sent);

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.ticketMail = ticketMail;

var _dirname = _path["default"].resolve(); // const ticketMail = (receiver, content) => {
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
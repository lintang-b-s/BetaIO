"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = exports.createUsers = void 0;

var _user = _interopRequireDefault(require("../../models/user.js"));

var _index = require("../mail/index.js");

var _badRequest = _interopRequireDefault(require("../../errors/bad-request.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUsers = function createUsers(req, res) {
  var _req$body, name, password, role, confirmPassword, email, result;

  return regeneratorRuntime.async(function createUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, password = _req$body.password, role = _req$body.role, confirmPassword = _req$body.confirmPassword, email = _req$body.email;
          console.log('req body: ', req.body);

          if (!(password !== confirmPassword)) {
            _context.next = 4;
            break;
          }

          throw new _badRequest["default"]('Password dan Konfirmasi password tidak cocok');

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_user["default"].create({
            name: name,
            email: email,
            password: password,
            role: role,
            otp: Math.floor(Math.random() * 9999)
          }));

        case 6:
          result = _context.sent;
          console.log('result: ', result);
          _context.next = 10;
          return regeneratorRuntime.awrap((0, _index.otpMail)(email, result));

        case 10:
          delete result._doc.password;
          delete result._doc.otp;
          return _context.abrupt("return", result);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createUsers = createUsers;

var getAllUsers = function getAllUsers(req) {
  var result;
  return regeneratorRuntime.async(function getAllUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Users.find());

        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAllUsers = getAllUsers;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateUser = exports.signin = void 0;

var _user = _interopRequireDefault(require("../../models/user.js"));

var _unauthenticated = _interopRequireDefault(require("../../errors/unauthenticated.js"));

var _unauthorized = _interopRequireDefault(require("../../errors/unauthorized.js"));

var _badRequest = _interopRequireDefault(require("../../errors/bad-request.js"));

var _createTokenUser = require("../../utils/createTokenUser.js");

var _jwt = require("../../utils/jwt.js");

var _refreshToken = require("./refreshToken.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signin = function signin(req) {
  var _req$body, email, password, result, isPasswordCorrect, token, refreshToken;

  return regeneratorRuntime.async(function signin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('halo dunia');
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context.next = 4;
            break;
          }

          throw new _badRequest["default"]('Please provide email and password');

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: email
          }));

        case 6:
          result = _context.sent;
          console.log('result query find: ', result);

          if (result) {
            _context.next = 10;
            break;
          }

          throw new _unauthorized["default"]('Invalid Credentials');

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(result.comparePassword(password));

        case 12:
          isPasswordCorrect = _context.sent;

          if (isPasswordCorrect) {
            _context.next = 15;
            break;
          }

          throw new _unauthorized["default"]('Invalid Credentials');

        case 15:
          token = (0, _jwt.createJWT)({
            payload: (0, _createTokenUser.createTokenUser)(result)
          });
          refreshToken = (0, _jwt.createRefreshJWT)({
            payload: (0, _createTokenUser.createTokenUser)(result)
          });
          _context.next = 19;
          return regeneratorRuntime.awrap((0, _refreshToken.createUserRefreshToken)({
            refreshToken: refreshToken,
            user: result._id
          }));

        case 19:
          return _context.abrupt("return", {
            token: token,
            refreshToken: refreshToken,
            role: result.role,
            email: result.email
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
}; // const signout= async (req) => {
// }


exports.signin = signin;

var activateUser = function activateUser(req) {
  var email, otp, check, result;
  return regeneratorRuntime.async(function activateUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.params.email;
          otp = req.body.otp;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: email
          }));

        case 4:
          check = _context2.sent;

          if (check) {
            _context2.next = 7;
            break;
          }

          throw new NotFoundError('Pengguna belum terdaftar');

        case 7:
          if (!(check && check.otp !== otp)) {
            _context2.next = 9;
            break;
          }

          throw new _badRequest["default"]('Kode otp salah');

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(_user["default"].findByIdAndUpdate(check._id, {
            status: 'aktif'
          }, {
            "new": true
          }));

        case 11:
          result = _context2.sent;
          delete result._doc.password;
          return _context2.abrupt("return", result);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.activateUser = activateUser;
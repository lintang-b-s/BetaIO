"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRefreshToken = exports.newUserAccessToken = exports.getUserRefreshToken = exports.createUserRefreshToken = void 0;

var _userRefreshToken = _interopRequireDefault(require("../../models/userRefreshToken.js"));

var _jwt = require("../../utils/jwt.js");

var _createTokenUser = require("../../utils/createTokenUser.js");

var _user = _interopRequireDefault(require("../../models/user.js"));

var _notFound = _interopRequireDefault(require("../../errors/not-found.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUserRefreshToken = function createUserRefreshToken(payload) {
  var result;
  return regeneratorRuntime.async(function createUserRefreshToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_userRefreshToken["default"].create(payload));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createUserRefreshToken = createUserRefreshToken;

var getUserRefreshToken = function getUserRefreshToken(req) {
  var refreshToken, result, payload, userCheck, token;
  return regeneratorRuntime.async(function getUserRefreshToken$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          refreshToken = req.params.refreshToken;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userRefreshToken["default"].findOne({
            refreshToken: refreshToken
          }));

        case 3:
          result = _context2.sent;

          if (result) {
            _context2.next = 6;
            break;
          }

          throw new _notFound["default"]("refreshToken tidak valid ");

        case 6:
          payload = (0, _jwt.isTokenValidRefreshToken)({
            token: result.refreshToken
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: payload.email
          }));

        case 9:
          userCheck = _context2.sent;
          token = (0, _jwt.createJWT)({
            payload: (0, _createTokenUser.createTokenUser)(userCheck)
          });
          return _context2.abrupt("return", token);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getUserRefreshToken = getUserRefreshToken;

var newUserAccessToken = function newUserAccessToken(req) {
  var refreshToken, result, payload, userCheck, token;
  return regeneratorRuntime.async(function newUserAccessToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('req.session.refreshToken: ', req.session.refreshToken);
          refreshToken = req.session.refreshToken.refreshToken;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_userRefreshToken["default"].findOne({
            refreshToken: refreshToken
          }));

        case 4:
          result = _context3.sent;

          if (result) {
            _context3.next = 7;
            break;
          }

          throw new _notFound["default"]("refreshToken tidak valid ");

        case 7:
          payload = (0, _jwt.isTokenValidRefreshToken)({
            token: result.refreshToken
          });
          _context3.next = 10;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: payload.email
          }));

        case 10:
          userCheck = _context3.sent;
          token = (0, _jwt.createJWT)({
            payload: (0, _createTokenUser.createTokenUser)(userCheck)
          });
          return _context3.abrupt("return", token);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.newUserAccessToken = newUserAccessToken;

var deleteRefreshToken = function deleteRefreshToken(req) {
  var refreshToken, result, payload, deleting;
  return regeneratorRuntime.async(function deleteRefreshToken$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log('refresh token: pas di deleterefreshtoken function:  ', req.session.refreshToken);
          refreshToken = req.session.refreshToken;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_userRefreshToken["default"].findOne({
            refreshToken: refreshToken
          }));

        case 4:
          result = _context4.sent;
          console.log('result: ', result.refreshToken);

          if (result) {
            _context4.next = 8;
            break;
          }

          throw new _notFound["default"]("refreshToken tidak valid ");

        case 8:
          payload = (0, _jwt.isTokenValidRefreshToken)({
            token: result.refreshToken
          });
          _context4.next = 11;
          return regeneratorRuntime.awrap(_userRefreshToken["default"].deleteOne({
            refreshToken: refreshToken
          }));

        case 11:
          deleting = _context4.sent;

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // deleteRefreshToken,


exports.deleteRefreshToken = deleteRefreshToken;
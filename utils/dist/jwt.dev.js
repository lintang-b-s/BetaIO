"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTokenValidRefreshToken = exports.createRefreshJWT = exports.isTokenValid = exports.createJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createJWT = function createJWT(_ref) {
  var payload = _ref.payload;

  var token = _jsonwebtoken["default"].sign(payload, _config.config.jwtSecret, {
    expiresIn: _config.config.jwtExpiration
  });

  return token;
};

exports.createJWT = createJWT;

var createRefreshJWT = function createRefreshJWT(_ref2) {
  var payload = _ref2.payload;

  var token = _jsonwebtoken["default"].sign(payload, _config.config.jwtRefreshTokenSecret, {
    expiresIn: _config.config.jwtRefreshTokenExpiration
  });

  return token;
};

exports.createRefreshJWT = createRefreshJWT;

var isTokenValid = function isTokenValid(_ref3) {
  var token = _ref3.token;
  return _jsonwebtoken["default"].verify(token, _config.config.jwtSecret);
};

exports.isTokenValid = isTokenValid;

var isTokenValidRefreshToken = function isTokenValidRefreshToken(_ref4) {
  var token = _ref4.token;
  return _jsonwebtoken["default"].verify(token, _config.config.jwtRefreshTokenSecret);
};

exports.isTokenValidRefreshToken = isTokenValidRefreshToken;
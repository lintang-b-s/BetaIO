"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRefreshTokenSchema = new _mongoose["default"].Schema({
  refreshToken: {
    type: String
  },
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

var UserRefreshToken = _mongoose["default"].model('UserRefreshToken', userRefreshTokenSchema);

var _default = UserRefreshToken;
exports["default"] = _default;
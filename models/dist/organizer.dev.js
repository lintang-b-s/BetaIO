"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var model = _mongoose["default"].model,
    Schema = _mongoose["default"].Schema;
var organizersSchema = Schema({
  organizer: {
    type: String,
    required: [true, 'Agent travel harus diisi']
  }
}, {
  timestamps: true
});

var _default = model('Organizer', organizersSchema);

exports["default"] = _default;
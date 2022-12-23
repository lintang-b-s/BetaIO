"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// gak ref ke organizer
var PaymentSchema = new _mongoose["default"].Schema({
  type: {
    type: String,
    required: [true, 'Tipe pembayaran harus diisi'],
    minlength: 3,
    maxlength: 50
  },
  status: {
    type: Boolean,
    "enum": [true, false],
    "default": true
  },
  organizer: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

var Payment = _mongoose["default"].model('Payment', PaymentSchema);

var _default = Payment;
exports["default"] = _default;
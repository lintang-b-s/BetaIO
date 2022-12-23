"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ticketCategoriesSchema = new _mongoose["default"].Schema({
  type: {
    type: String,
    required: [true, 'Tipe tiket harus diisi']
  },
  price: {
    type: Number,
    "default": 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  ticketId: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Ticket'
  }
});
var orderDetailSchema = new _mongoose["default"].Schema({
  ticketCategories: {
    type: ticketCategoriesSchema
  },
  sumTicket: {
    type: Number,
    required: true
  }
});
var ImageSchema = new _mongoose["default"].Schema({
  url: String,
  filename: String
});
var opts = {
  toJSON: {
    virtuals: true
  }
};
var orderSchema = new _mongoose["default"].Schema({
  date: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date
  },
  personalDetail: {
    firstName: {
      type: String,
      required: [true, 'Please provide firstName'],
      minlength: 3,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: [true, 'Please provide lastName'],
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: [true, 'Please provide email']
    },
    role: {
      type: String,
      "default": 'Back End Engineer'
    }
  },
  totalPay: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "enum": ['pending', 'paid'],
    "default": 'pending'
  },
  image: [ImageSchema],
  totalOrderTicket: {
    type: Number,
    required: true
  },
  orderItems: [orderDetailSchema],
  participant: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Place',
    required: true
  },
  payment: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  historyPlace: {
    title: {
      type: String,
      required: [true, 'nama tempat harus diisi']
    },
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        "enum": ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    placeType: String,
    description: String,
    location: String,
    flora: String,
    fauna: String,
    makanan: String,
    sumberAir: Boolean,
    habitant: String,
    author: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'User'
    }
  }
}, opts, {
  timestamps: true
}, {
  typeKey: '$type'
});

var Order = _mongoose["default"].model('Order', orderSchema);

var _default = Order;
exports["default"] = _default;
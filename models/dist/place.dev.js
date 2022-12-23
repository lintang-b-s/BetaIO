"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ticket = exports.Place = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ImageSchema = new Schema({
  url: String,
  filename: String
});
var ticketCategoriesSchema = new _mongoose["default"].Schema({
  type: {
    type: String,
    required: [true, 'Tipe tiket harus diisi']
  },
  price: {
    type: Number,
    "default": 0
  },
  stock: {
    type: Number,
    "default": 0
  },
  statusTicketCategories: {
    type: Boolean,
    "enum": [true, false],
    "default": true
  },
  expired: {
    type: Date
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});
ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});
var opts = {
  toJSON: {
    virtuals: true
  }
};
var PlaceSchema = new Schema({
  title: String,
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: "Ticket",
    required: true
  }]
}, opts, {
  typeKey: '$type'
}, {
  timestamps: true
});
PlaceSchema.virtual('properties.location').get(function () {
  return "<span>".concat(this.location, "</span>");
});
PlaceSchema.virtual('properties.popUpMarkup').get(function () {
  return "<strong><a href=\"/places/".concat(this._id, "\">").concat(this.title, "</a></strong>\n        <img class=\"img-fluid\" src=\"").concat(this.images[0].url, "\" alt=\"gambar place\">  </img>\n        <ul>\n          <li>type: ").concat(this.type, " </li>\n          <li>flora: ").concat(this.flora, " </li>\n          <li>fauna: ").concat(this.fauna, " </li>\n          <li>makanan: ").concat(this.makanan, " </li>\n          <li>habitant: ").concat(this.habitant, " </li>\n          <li id=\"air\">sumber air: ").concat(this.sumberAir, " </li>\n        </ul>\n        \n        \n        \n        ");
});

var Ticket = _mongoose["default"].model("Ticket", ticketCategoriesSchema);

exports.Ticket = Ticket;

var Place = _mongoose["default"].model('Place', PlaceSchema);

exports.Place = Place;
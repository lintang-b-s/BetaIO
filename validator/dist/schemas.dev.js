"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placeSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));

var _date = _interopRequireDefault(require("@joi/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dateJois = _date["default"];

var extension = function extension(joi) {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
      escapeHTML: {
        validate: function validate(value, helpers) {
          var clean = (0, _sanitizeHtml["default"])(value, {
            allowedTags: [],
            allowedAttributes: {}
          });
          if (clean !== value) return helpers.error('string.escapeHTML', {
            value: value
          });
          return clean;
        }
      }
    }
  };
};

var Joi = _joi["default"].extend(extension, dateJois);

var placeSchema = Joi.object({
  place: Joi.object({
    title: Joi.string().required().escapeHTML(),
    placeType: Joi.string().required().escapeHTML(),
    location: Joi.string().escapeHTML(),
    flora: Joi.string().required().escapeHTML(),
    fauna: Joi.string().required().escapeHTML(),
    makanan: Joi.string().required().escapeHTML(),
    sumberAir: Joi["boolean"]().required(),
    habitant: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML()
  }).required(),
  deleteImages: Joi.array(),
  author: Joi.string(),
  geometry: Joi.object({
    type: Joi.string().escapeHTML(),
    coordinates: Joi.array().items(Joi.number())
  }),
  // tickets: Joi.string() 
  tickets: Joi.object({
    type: Joi.string().escapeHTML(),
    price: Joi.number(),
    stock: Joi.number(),
    expired: Joi.date().format('YYYY-MM-DD'),
    startDate: Joi.date().format('YYYY-MM-DD'),
    endDate: Joi.date().format('YYYY-MM-DD')
  })
}); //   tickets: Joi.array().items(Joi.object({
//         type: Joi.string().escapeHTML(),
//         price: Joi.number(),
//         stock: Joi.number(),
//         expired: Joi.date().format('YYYY-MM-DD'),
//         startDate: Joi.date().format('YYYY-MM-DD'),
//         endDate: Joi.date().format('YYYY-MM-DD') 

exports.placeSchema = placeSchema;
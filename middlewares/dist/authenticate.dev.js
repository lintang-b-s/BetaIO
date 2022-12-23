"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthor = exports.validatePlace = exports.verifyAdmin = void 0;

var _place = require("../models/place.js");

var _schemas = require("../validator/schemas.js");

var _ExpressError = _interopRequireDefault(require("../utils/ExpressError.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyAdmin = function verifyAdmin() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }

    next();
  };
};

exports.verifyAdmin = verifyAdmin;

var validatePlace = function validatePlace(req, res, next) {
  console.log(req.body);

  var _placeSchema$validate = _schemas.placeSchema.validate(req.body),
      error = _placeSchema$validate.error;

  if (error) {
    var msg = error.details.map(function (el) {
      return el.message;
    }).join(',');
    throw new _ExpressError["default"](msg, 400);
  } else {
    next();
  }
};

exports.validatePlace = validatePlace;

var isAuthor = function isAuthor(req, res, next) {
  var id, place, userId;
  return regeneratorRuntime.async(function isAuthor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_place.Place.findById(id));

        case 3:
          place = _context.sent;
          userId = req.user.id;
          console.log('userId: ', userId);

          if (place.author.equals(userId)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.redirect("/places/".concat(id)));

        case 8:
          next();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.isAuthor = isAuthor;
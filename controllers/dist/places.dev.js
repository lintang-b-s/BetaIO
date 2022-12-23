"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderUploadBuktiPembayaran = exports.createTickets = exports.renderCheckout = exports.uploadBuktiPayment = exports.getAllPayment = exports.checkout = exports.deletePlace = exports.updatePlace = exports.renderEditForm = exports.showPlace = exports.createPlace = exports.renderNewForm = exports.index = void 0;

var _place = require("../models/place.js");

var _orders = _interopRequireDefault(require("../models/orders.js"));

var _index = require("../cloudinary/index.js");

var _geocoding = _interopRequireDefault(require("@mapbox/mapbox-sdk/services/geocoding.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _participants = require("../services/mongoose/participants.js");

var _payments = require("../services/mongoose/payments.js");

var _payments2 = _interopRequireDefault(require("../models/payments.js"));

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (process.env.NODE_ENV !== "production") {
  var _dirname = _path["default"].resolve();

  _dotenv["default"].config({
    path: _path["default"].resolve(_dirname, '.env')
  });
}

;
var mapBoxToken = process.env.MAPBOX_TOKEN;
var geocoder = (0, _geocoding["default"])({
  accessToken: mapBoxToken
});

var index = function index(req, res, next) {
  var places;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_place.Place.find({}));

        case 3:
          places = _context.sent;
          res.render('places/index', {
            places: places
          }); // res.status(200).json(places)

          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.index = index;

var renderNewForm = function renderNewForm(req, res) {
  res.render('places/new');
};

exports.renderNewForm = renderNewForm;

var createPlace = function createPlace(req, res, next) {
  var result, place;
  return regeneratorRuntime.async(function createPlace$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          result = new _place.Ticket(req.body.tickets);
          _context2.next = 4;
          return regeneratorRuntime.awrap(result.save());

        case 4:
          place = new _place.Place(req.body.place);
          console.log('result: ', result._id);
          place.tickets = result._id; // place.geometry = geoData.body.features[0].geometry;

          place.geometry.type = req.body.geometry.type;
          place.geometry.coordinates = req.body.geometry.coordinates; // place.geometry = req.body.place

          place.images = req.files.map(function (f) {
            return {
              url: f.path,
              filename: f.filename
            };
          });
          place.author = req.user.id;
          _context2.next = 13;
          return regeneratorRuntime.awrap(place.save());

        case 13:
          res.redirect("/places/".concat(place._id));
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          next(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.createPlace = createPlace;

var showPlace = function showPlace(req, res) {
  var place, user;
  return regeneratorRuntime.async(function showPlace$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_place.Place.findById(req.params.id).populate('author').populate('tickets'));

        case 2:
          place = _context3.sent;
          user = req.user;
          console.log('place: ', place);

          if (place) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.redirect('/places'));

        case 7:
          req.session.redirectTo = "/places/".concat(req.params.id); // res.header('Access-Control-Allow-Origin', '*');

          res.render('places/show', {
            place: place,
            user: user
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.showPlace = showPlace;

var renderEditForm = function renderEditForm(req, res) {
  var place, user;
  return regeneratorRuntime.async(function renderEditForm$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_place.Place.findById(req.params.id));

        case 2:
          place = _context4.sent;

          if (place) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.redirect('/places'));

        case 5:
          user = req.user;
          res.render('places/edit', {
            place: place
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.renderEditForm = renderEditForm;

var updatePlace = function updatePlace(req, res) {
  var _place$images;

  var id, place, imgs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filename;

  return regeneratorRuntime.async(function updatePlace$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_place.Place.findByIdAndUpdate(id, _objectSpread({}, req.body.place)));

        case 3:
          place = _context5.sent;
          place.geometry.type = req.body.geometry.type;
          place.tickets = req.body.tickets;
          place.geometry.coordinates = req.body.geometry.coordinates;
          console.log('userId updatePlace: ', req.user.id);
          imgs = req.files.map(function (f) {
            return {
              url: f.path,
              filename: f.filename
            };
          });

          (_place$images = place.images).push.apply(_place$images, _toConsumableArray(imgs));

          _context5.next = 12;
          return regeneratorRuntime.awrap(place.save());

        case 12:
          if (!req.body.deleteImages) {
            _context5.next = 34;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context5.prev = 16;

          for (_iterator = req.body.deleteImages[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            filename = _step.value;

            _index.cloudinary.uploader.destroy(filename);
          }

          _context5.next = 24;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](16);
          _didIteratorError = true;
          _iteratorError = _context5.t0;

        case 24:
          _context5.prev = 24;
          _context5.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context5.prev = 27;

          if (!_didIteratorError) {
            _context5.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context5.finish(27);

        case 31:
          return _context5.finish(24);

        case 32:
          _context5.next = 34;
          return regeneratorRuntime.awrap(place.updateOne({
            $pull: {
              images: {
                filename: {
                  $in: req.body.deleteImages
                }
              }
            }
          }));

        case 34:
          res.redirect("/places/".concat(place._id));

        case 35:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[16, 20, 24, 32], [25,, 27, 31]]);
};

exports.updatePlace = updatePlace;

var renderCheckout = function renderCheckout(req, res) {
  var ticketId, place, payments, user;
  return regeneratorRuntime.async(function renderCheckout$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          ticketId = req.params.ticketId;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_place.Place.findById(req.params.id).populate('author').populate('tickets'));

        case 3:
          place = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(_payments2["default"].find({
            organizer: req.user.id
          }));

        case 6:
          payments = _context6.sent;
          console.log('your payments: ', payments.length);

          if (payments.length == 0) {
            res.redirect('/addPayment');
          }

          if (place) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt("return", res.redirect('/places'));

        case 11:
          user = req.user;
          res.render('places/checkout', {
            place: place,
            payments: payments
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.renderCheckout = renderCheckout;

var deletePlace = function deletePlace(req, res) {
  var id, place;
  return regeneratorRuntime.async(function deletePlace$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_place.Place.findByIdAndDelete(id));

        case 3:
          place = _context7.sent;
          res.redirect('/places');

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.deletePlace = deletePlace;

var checkout = function checkout(req, res, next) {
  var _ref, result, placeId;

  return regeneratorRuntime.async(function checkout$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;

          if (!req.body.payment) {
            res.redirect('/addPayment');
          }

          _context8.next = 4;
          return regeneratorRuntime.awrap((0, _participants.checkoutOrder)(req));

        case 4:
          _ref = _context8.sent;
          result = _ref.result;
          placeId = _ref.placeId;
          res.status(201); // json({
          //     data: result,
          // });

          res.redirect("/places/".concat(placeId, "/").concat(result._id, "/uploadPembayaran"));
          _context8.next = 15;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          next(_context8.t0);

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.checkout = checkout;

var createTickets = function createTickets(req, res, next) {
  var result;
  return regeneratorRuntime.async(function createTickets$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          result = new _place.Ticket(req.body);
          _context9.next = 4;
          return regeneratorRuntime.awrap(result.save());

        case 4:
          console.log('ticket: ', result);
          res.status(201); // res.status(201).json({
          //   data: result
          // })

          _context9.next = 12;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          next(_context9.t0);

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.createTickets = createTickets;

var getAllPayment = function getAllPayment(req, res, next) {
  var result;
  return regeneratorRuntime.async(function getAllPayment$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(getAllPaymentByUser(req));

        case 3:
          result = _context10.sent;
          res.status(StatusCodes.OK).json({
            data: result
          });
          _context10.next = 10;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllPayment = getAllPayment;

var renderUploadBuktiPembayaran = function renderUploadBuktiPembayaran(req, res, next) {
  var order;
  return regeneratorRuntime.async(function renderUploadBuktiPembayaran$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(_orders["default"].findById(req.params.orderId).populate("participant").populate("place").populate("payment").populate("historyPlace.author"));

        case 3:
          order = _context11.sent;
          console.log('order:', order);
          res.render('places/uploadBuktiPembayaran', {
            order: order
          });
          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          next(_context11.t0);

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.renderUploadBuktiPembayaran = renderUploadBuktiPembayaran;

var uploadBuktiPayment = function uploadBuktiPayment(req, res, next) {
  var result;
  return regeneratorRuntime.async(function uploadBuktiPayment$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap((0, _participants.buktiPayment)(req));

        case 3:
          result = _context12.sent;
          // res.status(201).json({
          //   data: result,
          // });
          res.status(200);
          res.redirect("/places");
          _context12.next = 12;
          break;

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          next(_context12.t0);

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.uploadBuktiPayment = uploadBuktiPayment;
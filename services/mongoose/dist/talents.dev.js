"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkingTalents = exports.deleteTalents = exports.updateTalents = exports.getOneTalents = exports.createTalents = exports.getAllTalents = void 0;

var _model = _interopRequireDefault(require("../../api/v1/talents/model"));

var _images = require("./images");

var _errors = require("../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAllTalents = function getAllTalents(req) {
  var keyword, condition, result;
  return regeneratorRuntime.async(function getAllTalents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          keyword = req.query.keyword;
          condition = {
            organizer: req.user.organizer
          };

          if (keyword) {
            condition = _objectSpread({}, condition, {
              name: {
                $regex: keyword,
                $options: 'i'
              }
            });
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(_model["default"].find(condition).populate({
            path: 'image',
            select: '_id name'
          }).select('_id name role image'));

        case 5:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllTalents = getAllTalents;

var createTalents = function createTalents(req) {
  var _req$body, name, role, image, check, result;

  return regeneratorRuntime.async(function createTalents$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, role = _req$body.role, image = _req$body.image; // cari image dengan field image

          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _images.checkingImage)(image));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(_model["default"].findOne({
            name: name,
            organizer: req.user.organizer
          }));

        case 5:
          check = _context2.sent;

          if (!check) {
            _context2.next = 8;
            break;
          }

          throw new _errors.BadRequestError('pembicara sudah terdaftar');

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(_model["default"].create({
            name: name,
            image: image,
            role: role,
            organizer: req.user.organizer
          }));

        case 10:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.createTalents = createTalents;

var getOneTalents = function getOneTalents(req) {
  var id, result;
  return regeneratorRuntime.async(function getOneTalents$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_model["default"].findOne({
            _id: id,
            organizer: req.user.organizer
          }).populate({
            path: 'image',
            select: '_id name'
          }).select('_id name role image'));

        case 3:
          result = _context3.sent;

          if (result) {
            _context3.next = 6;
            break;
          }

          throw new _errors.NotFoundError("Tidak ada pembicara dengan id :  ".concat(id));

        case 6:
          return _context3.abrupt("return", result);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getOneTalents = getOneTalents;

var updateTalents = function updateTalents(req) {
  var id, _req$body2, name, image, role, check, result;

  return regeneratorRuntime.async(function updateTalents$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, image = _req$body2.image, role = _req$body2.role; // cari image dengan field image

          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _images.checkingImage)(image));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_model["default"].findOne({
            name: name,
            organizer: req.user.organizer,
            _id: {
              $ne: id
            }
          }));

        case 6:
          check = _context4.sent;

          if (!check) {
            _context4.next = 9;
            break;
          }

          throw new _errors.BadRequestError('pembicara sudah terdaftar');

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(_model["default"].findOneAndUpdate({
            _id: id
          }, {
            name: name,
            image: image,
            role: role,
            organizer: req.user.organizer
          }, {
            "new": true,
            runValidators: true
          }));

        case 11:
          result = _context4.sent;

          if (result) {
            _context4.next = 14;
            break;
          }

          throw new _errors.NotFoundError("Tidak ada pembicara dengan id :  ".concat(id));

        case 14:
          return _context4.abrupt("return", result);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.updateTalents = updateTalents;

var deleteTalents = function deleteTalents(req) {
  var id, result;
  return regeneratorRuntime.async(function deleteTalents$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_model["default"].findOne({
            _id: id,
            organizer: req.user.organizer
          }));

        case 3:
          result = _context5.sent;

          if (result) {
            _context5.next = 6;
            break;
          }

          throw new _errors.NotFoundError("Tidak ada pembicara dengan id :  ".concat(id));

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(result.remove());

        case 8:
          return _context5.abrupt("return", result);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.deleteTalents = deleteTalents;

var checkingTalents = function checkingTalents(id) {
  var result;
  return regeneratorRuntime.async(function checkingTalents$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_model["default"].findOne({
            _id: id
          }));

        case 2:
          result = _context6.sent;

          if (result) {
            _context6.next = 5;
            break;
          }

          throw new _errors.NotFoundError("Tidak ada pembicara dengan id :  ".concat(id));

        case 5:
          return _context6.abrupt("return", result);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.checkingTalents = checkingTalents;
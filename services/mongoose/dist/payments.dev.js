"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkingPayments = exports.deletePayments = exports.updatePayments = exports.getOnePayments = exports.createPayments = exports.getAllPayments = void 0;

var _payments = _interopRequireDefault(require("../../models/payments.js"));

var _unauthenticated = _interopRequireDefault(require("../../errors/unauthenticated.js"));

var _unauthorized = _interopRequireDefault(require("../../errors/unauthorized.js"));

var _badRequest = _interopRequireDefault(require("../../errors/bad-request.js"));

var _notFound = _interopRequireDefault(require("../../errors/not-found.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllPayments = function getAllPayments(req) {
  var condition, result;
  return regeneratorRuntime.async(function getAllPayments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          condition = {
            organizer: req.user.id
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(_payments["default"].find(condition).select('_id type status'));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllPayments = getAllPayments;

var createPayments = function createPayments(req) {
  var type, check, result;
  return regeneratorRuntime.async(function createPayments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          type = req.body.type;
          console.log('type:', type);
          console.log('id', req.user.id);
          _context2.next = 5;
          return regeneratorRuntime.awrap(_payments["default"].findOne({
            type: type,
            organizer: req.user.id
          }));

        case 5:
          check = _context2.sent;

          if (!check) {
            _context2.next = 8;
            break;
          }

          throw new _badRequest["default"]('Tipe pembayaran duplikat');

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(_payments["default"].create({
            type: type,
            organizer: req.user.id
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

exports.createPayments = createPayments;

var getOnePayments = function getOnePayments(req) {
  var id, result;
  return regeneratorRuntime.async(function getOnePayments$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_payments["default"].findOne({
            _id: id,
            organizer: req.user.id
          }).select('_id type status '));

        case 3:
          result = _context3.sent;

          if (result) {
            _context3.next = 6;
            break;
          }

          throw new NotFoundError("Tidak ada tipe pembayaran dengan id :  ".concat(id));

        case 6:
          return _context3.abrupt("return", result);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getOnePayments = getOnePayments;

var updatePayments = function updatePayments(req) {
  var id, type, check, result;
  return regeneratorRuntime.async(function updatePayments$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          type = req.body.type;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_payments["default"].findOne({
            type: type,
            organizer: req.user.id,
            _id: {
              $ne: id
            }
          }));

        case 4:
          check = _context4.sent;

          if (!check) {
            _context4.next = 7;
            break;
          }

          throw new _badRequest["default"]('Tipe pembayaran duplikat');

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(_payments["default"].findOneAndUpdate({
            _id: id
          }, {
            type: type,
            organizer: req.user.id
          }, {
            "new": true,
            runValidators: true
          }));

        case 9:
          result = _context4.sent;

          if (result) {
            _context4.next = 12;
            break;
          }

          throw new NotFoundError("Tidak ada tipe pembayaran dengan id :  ".concat(id));

        case 12:
          return _context4.abrupt("return", result);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.updatePayments = updatePayments;

var deletePayments = function deletePayments(req) {
  var id, result;
  return regeneratorRuntime.async(function deletePayments$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_payments["default"].findOne({
            _id: id,
            organizer: req.user.id
          }));

        case 3:
          result = _context5.sent;

          if (result) {
            _context5.next = 6;
            break;
          }

          throw new NotFoundError("Tidak ada tipe pembayaran dengan id :  ".concat(id));

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

exports.deletePayments = deletePayments;

var checkingPayments = function checkingPayments(id) {
  var result;
  return regeneratorRuntime.async(function checkingPayments$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_payments["default"].findOne({
            _id: id
          }));

        case 2:
          result = _context6.sent;

          if (result) {
            _context6.next = 5;
            break;
          }

          throw new NotFoundError("Tidak ada tipe pembayaran dengan id :  ".concat(id));

        case 5:
          return _context6.abrupt("return", result);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.checkingPayments = checkingPayments;
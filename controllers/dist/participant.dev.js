"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkout = exports.getAllPayment = exports.getDashboard = void 0;

var _participants = require("../../../services/mongoose/participants.js");

var _httpStatusCodes = require("http-status-codes");

var getDashboard = function getDashboard(req, res, next) {
  var result;
  return regeneratorRuntime.async(function getDashboard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _participants.getAllOrders)(req));

        case 3:
          result = _context.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            data: result
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getDashboard = getDashboard;

var getAllPayment = function getAllPayment(req, res, next) {
  var result;
  return regeneratorRuntime.async(function getAllPayment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _participants.getAllPaymentByOrganizer)(req));

        case 3:
          result = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            data: result
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllPayment = getAllPayment;

var checkout = function checkout(req, res, next) {
  var result;
  return regeneratorRuntime.async(function checkout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _participants.checkoutOrder)(req));

        case 3:
          result = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            data: result
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.checkout = checkout;
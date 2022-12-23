"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = exports.destroy = exports.create = void 0;

var _payments = require("../services/mongoose/payments.js");

var create = function create(req, res, next) {
  var result, redirectTo;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _payments.createPayments)(req));

        case 3:
          result = _context.sent;
          console.log('result: ', result);
          res.status(201);
          redirectTo = req.session.redirectTo || '/places'; // do your thang

          res.redirect(redirectTo);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.create = create;

var destroy = function destroy(req, res, next) {
  var result;
  return regeneratorRuntime.async(function destroy$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _payments.deletePayments)(req));

        case 3:
          result = _context2.sent;
          res.status(200).json({
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

exports.destroy = destroy;

var index = function index(req, res, next) {
  var result;
  return regeneratorRuntime.async(function index$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _payments.getAllPayments)(req));

        case 3:
          result = _context3.sent;
          res.status(200).json({
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

exports.index = index;
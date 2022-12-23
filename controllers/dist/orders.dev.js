"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approvePayment = exports.index = void 0;

var _orders = require("../services/mongoose/orders.js");

var _httpStatusCodes = require("http-status-codes");

var _orders2 = _interopRequireDefault(require("../models/orders.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var index = function index(req, res, next) {
  var result, order, pages, total;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _orders.getAllOrders)(req));

        case 3:
          result = _context.sent;
          // res.status(StatusCodes.OK).json({
          //   data: { order: result.data, pages: result.pages, total: result.total },
          // });
          order = result.data;
          pages = result.pages;
          total = result.total;
          res.status(200);
          res.render('orders/listOrders', {
            order: order,
            pages: pages,
            total: total
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.index = index;

var approvePayment = function approvePayment(req, res, next) {
  var result;
  return regeneratorRuntime.async(function approvePayment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _orders.approveOrder)(req));

        case 3:
          result = _context2.sent;
          // res.status(200).json({
          //   data: result
          // });
          res.status(200);
          res.redirect('/orders');
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          next(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.approvePayment = approvePayment;
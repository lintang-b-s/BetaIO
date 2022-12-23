"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approveOrder = exports.getAllOrders = void 0;

var _orders = _interopRequireDefault(require("../../models/orders.js"));

var _place = require("../../models/place.js");

var _index = require("../mail/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllOrders = function getAllOrders(req) {
  var _req$query, _req$query$limit, limit, _req$query$page, page, condition, result, count;

  return regeneratorRuntime.async(function getAllOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
          condition = {};
          _context.next = 4;
          return regeneratorRuntime.awrap(_orders["default"].find({}).populate("payment").populate("place").populate("participant").populate("payment").limit(limit).skip(limit * (page - 1)));

        case 4:
          result = _context.sent;
          console.log('result: ', result);
          console.log('nama tempat: ', result[0].place.title);
          _context.next = 9;
          return regeneratorRuntime.awrap(_orders["default"].countDocuments({}));

        case 9:
          count = _context.sent;
          return _context.abrupt("return", {
            data: result,
            pages: Math.ceil(count / limit),
            total: count
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllOrders = getAllOrders;

var approveOrder = function approveOrder(req) {
  var _req$params, id, placeId, order, ticketType, ticketOrder, orderTicket;

  return regeneratorRuntime.async(function approveOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, placeId = _req$params.placeId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_orders["default"].findByIdAndUpdate(id, {
            status: 'paid'
          }).populate({
            path: 'orderItems',
            populate: {
              path: 'ticketCategories',
              select: "_id type price startDate endDate"
            }
          }).populate("payment").populate("historyPlace.author").populate("place").populate("participant").populate("payment"));

        case 3:
          order = _context2.sent;
          ticketType = order.orderItems[0].ticketCategories.type; // const ticket = await Place.findOne({ _id: placeId, 'tickets.type': ticketType, 'tickets.price':order.orderItems[0].ticketCategories.price, 'tickets.startDate': order.orderItems[0].ticketCategories.startDate,
          //   'tickets.endDate':  order.orderItems[0].ticketCategories.endDate});

          _context2.next = 7;
          return regeneratorRuntime.awrap(_place.Ticket.findById(order.orderItems[0].ticketCategories.ticketId));

        case 7:
          ticketOrder = _context2.sent;
          console.log('order ticket: ', order.place.name);
          orderTicket = {
            order: order,
            ticket: ticketOrder,
            orderDate: function orderDate() {
              return order.date.toDateString();
            },
            startDate: function startDate() {
              return ticketOrder.startDate.toDateString();
            },
            endDate: function endDate() {
              return ticketOrder.endDate.toDateString();
            }
          };
          _context2.next = 12;
          return regeneratorRuntime.awrap(order.save());

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap((0, _index.ticketMail)(order.personalDetail.email, orderTicket));

        case 14:
          return _context2.abrupt("return", order);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.approveOrder = approveOrder;
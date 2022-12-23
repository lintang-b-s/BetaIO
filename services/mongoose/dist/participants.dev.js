"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buktiPayment = exports.getAllPaymentByUser = exports.checkoutOrder = exports.getAllOrder = void 0;

var _place = require("../../models/place.js");

var _orders = _interopRequireDefault(require("../../models/orders.js"));

var _payments = _interopRequireDefault(require("../../models/payments.js"));

var _unauthenticated = _interopRequireDefault(require("../../errors/unauthenticated.js"));

var _unauthorized = _interopRequireDefault(require("../../errors/unauthorized.js"));

var _badRequest = _interopRequireDefault(require("../../errors/bad-request.js"));

var _notFound = _interopRequireDefault(require("../../errors/not-found.js"));

var _jwt = require("../../utils/jwt.js");

var _index = require("../mail/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllOrder = function getAllOrder(req) {
  var result;
  return regeneratorRuntime.async(function getAllOrder$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_orders["default"].find({
            participant: req.participant.id
          }));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**R
 * Tugas Send email invoice
 * TODO: Ambil data email dari personal detail
 *  */


exports.getAllOrder = getAllOrder;

var checkoutOrder = function checkoutOrder(req) {
  var _req$body, personalDetail, payment, tickets, placeId, checkingPlace, checkingPayment, totalPay, totalOrderTicket, historyPlaces, dateNow, result, orderQuery, ticketOrder, resultOrder;

  return regeneratorRuntime.async(function checkoutOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // req.body: participant, place, personalDetail, payment, tickets
          _req$body = req.body, personalDetail = _req$body.personalDetail, payment = _req$body.payment, tickets = _req$body.tickets;
          placeId = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_place.Place.findOne({
            _id: placeId
          }).populate("tickets"));

        case 4:
          checkingPlace = _context2.sent;

          if (checkingPlace) {
            _context2.next = 7;
            break;
          }

          throw new _notFound["default"]('Tidak ada acara dengan id : ' + placeId);

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_payments["default"].findOne({
            _id: payment
          }));

        case 9:
          checkingPayment = _context2.sent;

          if (checkingPayment) {
            _context2.next = 12;
            break;
          }

          throw new _notFound["default"]('Tidak ada metode pembayaran dengan id :' + payment);

        case 12:
          totalPay = 0, totalOrderTicket = 0;
          _context2.next = 15;
          return regeneratorRuntime.awrap(tickets.forEach(function (tic) {
            checkingPlace.tickets.forEach(function (ticket) {
              console.log('ticket.startDate: ', ticket.startDate);
              console.log('tic.ticketCategories.startDate: ', tic.ticketCategories.startDate);

              if (tic.ticketCategories.type === ticket.type && tic.ticketCategories.startDate == ticket.startDate.toISOString().split('T')[0] && tic.ticketCategories.endDate == ticket.endDate.toISOString().split('T')[0]) {
                if (tic.sumTicket > ticket.stock) {
                  throw new _notFound["default"]('Stock place tidak mencukupi');
                } else {
                  ticket.stock -= tic.sumTicket;
                  totalOrderTicket += tic.sumTicket;
                  totalPay += tic.ticketCategories.price * tic.sumTicket;
                }
              }
            });
          }));

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(checkingPlace.save());

        case 17:
          historyPlaces = {
            title: checkingPlace.title,
            images: checkingPlace.images,
            geometry: checkingPlace.geometry,
            placeType: checkingPlace.placeType,
            description: checkingPlace.description,
            location: checkingPlace.location,
            tickets: tickets,
            flora: checkingPlace.flora,
            fauna: checkingPlace.fauna,
            makanan: checkingPlace.makanan,
            author: checkingPlace.author,
            sumberAir: checkingPlace.sumberAir,
            habitant: checkingPlace.habitant
          };
          dateNow = new Date();
          result = new _orders["default"]({
            date: new Date(),
            personalDetail: personalDetail,
            totalPay: totalPay,
            totalOrderTicket: totalOrderTicket,
            orderItems: tickets,
            participant: req.user.id,
            place: placeId,
            historyPlace: historyPlaces,
            payment: payment,
            dueDate: dateNow.setDate(dateNow.getDate() + 1)
          });
          _context2.next = 22;
          return regeneratorRuntime.awrap(result.save());

        case 22:
          _context2.next = 24;
          return regeneratorRuntime.awrap(_orders["default"].findById(result._id).populate({
            path: 'orderItems',
            populate: {
              path: 'ticketCategories',
              select: "_id type price startDate endDate"
            }
          }).populate("payment").populate("historyPlace.author").populate("place").populate("participant").populate("payment"));

        case 24:
          orderQuery = _context2.sent;
          _context2.next = 27;
          return regeneratorRuntime.awrap(_place.Ticket.findById(orderQuery.orderItems[0].ticketCategories.ticketId));

        case 27:
          ticketOrder = _context2.sent;
          console.log('result:', orderQuery);
          console.log('ticketquery: ', ticketOrder);
          resultOrder = {
            order: orderQuery,
            ticket: ticketOrder,
            orderDate: function orderDate() {
              return orderQuery.date.toGMTString();
            },
            dueDate: function dueDate() {
              return orderQuery.dueDate.toGMTString();
            },
            startDate: function startDate() {
              return ticketOrder.startDate.toDateString();
            },
            endDate: function endDate() {
              return ticketOrder.endDate.toDateString();
            }
          };
          _context2.next = 33;
          return regeneratorRuntime.awrap((0, _index.invoiceMail)(personalDetail.email, resultOrder));

        case 33:
          return _context2.abrupt("return", {
            result: result,
            placeId: placeId
          });

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.checkoutOrder = checkoutOrder;

var buktiPayment = function buktiPayment(req) {
  var order, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filename;

  return regeneratorRuntime.async(function buktiPayment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_orders["default"].findByIdAndUpdate(req.params.orderId, {
            image: req.files.map(function (f) {
              return {
                url: f.path,
                filename: f.filename
              };
            })
          }));

        case 2:
          order = _context3.sent;

          if (!req.body.deleteImages) {
            _context3.next = 25;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 7;

          for (_iterator = req.body.deleteImages[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            filename = _step.value;
            cloudinary.uploader.destroy(filename);
          }

          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 15:
          _context3.prev = 15;
          _context3.prev = 16;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 18:
          _context3.prev = 18;

          if (!_didIteratorError) {
            _context3.next = 21;
            break;
          }

          throw _iteratorError;

        case 21:
          return _context3.finish(18);

        case 22:
          return _context3.finish(15);

        case 23:
          _context3.next = 25;
          return regeneratorRuntime.awrap(order.updateOne({
            $pull: {
              image: {
                filename: {
                  $in: req.body.deleteImages
                }
              }
            }
          }));

        case 25:
          _context3.next = 27;
          return regeneratorRuntime.awrap(order.save());

        case 27:
          return _context3.abrupt("return", order);

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 11, 15, 23], [16,, 18, 22]]);
};

exports.buktiPayment = buktiPayment;

var getAllPaymentByUser = function getAllPaymentByUser(req) {
  var user, result;
  return regeneratorRuntime.async(function getAllPaymentByUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_payments["default"].find({
            id: user
          }));

        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getAllPaymentByUser = getAllPaymentByUser;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCMSUsers = exports.createCMSUser = exports.createCMSOrganizer = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _users = require("../../../services/mongoose/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getCMSUsers = function getCMSUsers(req, res, next) {
  var result;
  return regeneratorRuntime.async(function getCMSUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _users.getAllUsers)(req));

        case 3:
          result = _context.sent;
          res.status(_httpStatusCodes["default"].OK).json({
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

exports.getCMSUsers = getCMSUsers;

var createCMSOrganizer = function createCMSOrganizer(req, res, next) {
  var result;
  return regeneratorRuntime.async(function createCMSOrganizer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _users.createOrganizer)(req));

        case 3:
          result = _context2.sent;
          res.status(_httpStatusCodes["default"].CREATED).json({
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

exports.createCMSOrganizer = createCMSOrganizer;

var createCMSUser = function createCMSUser(req, res, next) {
  var result;
  return regeneratorRuntime.async(function createCMSUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _users.createUsers)(req));

        case 3:
          result = _context3.sent;
          res.status(_httpStatusCodes["default"].CREATED).json({
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

exports.createCMSUser = createCMSUser;
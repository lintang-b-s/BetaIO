"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _refreshToken = require("../services/mongoose/refreshToken.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var index = function index(req, res, next) {
  var result;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _refreshToken.getUserRefreshToken)(req));

        case 3:
          result = _context.sent;
          res.status(_httpStatusCodes["default"].OK).json({
            data: {
              token: result
            }
          });
          _context.next = 12;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('err');
          console.log(_context.t0);
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.index = index;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizeRoles = exports.authenticateUser = void 0;

var _unauthenticated = _interopRequireDefault(require("../errors/unauthenticated.js"));

var _unauthorized = _interopRequireDefault(require("../errors/unauthorized.js"));

var _jwt = require("../utils/jwt.js");

var _refreshToken = require("../services/mongoose/refreshToken.js");

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authenticateUser = function authenticateUser(req, res, next) {
  var token, refreshToken, authHeader, payload, result, _payload;

  return regeneratorRuntime.async(function authenticateUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // check header
          authHeader = req.headers.authorization; // if (authHeader && authHeader.startsWith('Bearer')) {
          //   token = authHeader.split(' ')[1];
          // }
          // gak ada req.session sama sekali

          console.log('authHeader', authHeader);
          console.log('authHeader', req.session.accessToken);
          console.log('authHeader', req.session.refreshToken);
          token = req.session.accessToken;
          refreshToken = req.session.refreshToken;

          if (token) {
            _context.next = 11;
            break;
          }

          throw new _unauthenticated["default"]('Authentication invalid');

        case 11:
          if (refreshToken) {
            _context.next = 13;
            break;
          }

          throw new _unauthenticated["default"]('Authentication invalid');

        case 13:
          payload = (0, _jwt.isTokenValid)({
            token: token
          }); // Attach the user and his permissions to the req object

          if (!payload) {
            _context.next = 18;
            break;
          }

          // req.user = await User.findById()
          req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            status: payload.status,
            id: payload.id
          };
          _context.next = 24;
          break;

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap((0, _refreshToken.newUserAccessToken)(req));

        case 20:
          result = _context.sent;
          req.session.accessToken = result.token;
          _payload = (0, _jwt.isTokenValid)({
            token: token
          });
          req.user = {
            email: _payload.email,
            role: _payload.role,
            name: _payload.name,
            status: _payload.status,
            id: _payload.id
          };

        case 24:
          console.log("req user email: ", req.user.email);
          next();
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
};

exports.authenticateUser = authenticateUser;

var authorizeRoles = function authorizeRoles() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      throw new _unauthorized["default"]('Unauthorized to access this route');
    }

    next();
  };
};

exports.authorizeRoles = authorizeRoles;
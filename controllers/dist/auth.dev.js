"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putAuthUserCms = exports.logoutUserCms = exports.activateUserCms = exports.signinCms = void 0;

var _auth = require("../services/mongoose/auth.js");

var _nodeLocalstorage = _interopRequireDefault(require("node-localstorage"));

var _httpStatusCodes = require("http-status-codes");

var _refreshToken = require("../services/mongoose/refreshToken.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signinCms = function signinCms(req, res, next) {
  var result;
  return regeneratorRuntime.async(function signinCms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('halo dunia');
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _auth.signin)(req));

        case 4:
          result = _context.sent;
          //gagal nya di services signin ini pas setelah refreshtoken kehapus dari database
          console.log('refreshToken: ', req.session.refreshToken);
          req.session.accessToken = result.token;
          req.session.refreshToken = result.refreshToken;
          console.log('actoken: ', req.session.accessToken); // res.status(StatusCodes.CREATED).json({
          //   data: result,
          // });

          res.status(201);
          res.redirect("/places");
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.signinCms = signinCms;

var logoutUserCms = function logoutUserCms(req, res, next) {
  return regeneratorRuntime.async(function logoutUserCms$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _refreshToken.deleteRefreshToken)(req));

        case 3:
          // const result = await signout(req);
          req.session.destroy();
          res.status(200);
          res.redirect("/login");
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

exports.logoutUserCms = logoutUserCms;

var putAuthUserCms = function putAuthUserCms(req, res, next) {
  var result;
  return regeneratorRuntime.async(function putAuthUserCms$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _refreshToken.newUserAccessToken)(req));

        case 3:
          result = _context3.sent;
          req.session.accessToken = result.token;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            data: result
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          next(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.putAuthUserCms = putAuthUserCms;

var activateUserCms = function activateUserCms(req, res, next) {
  var result;
  return regeneratorRuntime.async(function activateUserCms$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap((0, _auth.activateUser)(req));

        case 3:
          result = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(result.save());

        case 6:
          res.status(_httpStatusCodes.StatusCodes.OK);
          res.redirect('/login');
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.activateUserCms = activateUserCms;
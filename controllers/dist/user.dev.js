"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLogout = exports.renderPayment = exports.renderOTP = exports.renderLogin = exports.renderRegister = exports.userRegister = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _nodeLocalstorage = _interopRequireDefault(require("node-localstorage"));

var _httpStatusCodes = require("http-status-codes");

var _users = require("../services/mongoose/users.js");

var _user = _interopRequireDefault(require("../models/user.js"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderRegister = function renderRegister(req, res) {
  res.render('users/register');
};

exports.renderRegister = renderRegister;

var renderLogout = function renderLogout(req, res) {
  res.render('users/logout');
};

exports.renderLogout = renderLogout;

var renderLogin = function renderLogin(req, res) {
  console.log('halo dunia');
  res.render('users/login');
};

exports.renderLogin = renderLogin;

var renderOTP = function renderOTP(req, res) {
  var userEmail;
  return regeneratorRuntime.async(function renderOTP$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: req.params.email
          }, 'email'));

        case 2:
          userEmail = _context.sent;
          console.log('email: ', userEmail);
          res.render('users/verifyUser', {
            userEmail: userEmail
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.renderOTP = renderOTP;

var renderPayment = function renderPayment(req, res) {
  var userEmail;
  return regeneratorRuntime.async(function renderPayment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: req.user.email
          }, 'email'));

        case 2:
          userEmail = _context2.sent;
          res.render('users/addPayment', {
            userEmail: userEmail
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.renderPayment = renderPayment;

var userRegister = function userRegister(req, res, next) {
  var result;
  return regeneratorRuntime.async(function userRegister$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _users.createUsers)(req));

        case 3:
          result = _context3.sent;
          console.log('user: ', result);
          res.status(_httpStatusCodes.StatusCodes.CREATED);
          _context3.next = 8;
          return regeneratorRuntime.awrap(result.save());

        case 8:
          // res.redirect(`/users/login`);
          res.redirect("/".concat(result.email, "/activate"));
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          next(_context3.t0);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.userRegister = userRegister;

var renderAfterLogin = function renderAfterLogin(req, res, next) {
  res.render('places/index');
};
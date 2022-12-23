"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpStatusCodes = require("http-status-codes");

var errorHandlerMiddleware = function errorHandlerMiddleware(err, req, res, next) {
  console.log('err');
  console.log(err.message);
  var customError = {
    // set default
    statusCode: err.statusCode || _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }; // error validation dari mongoose

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(function (item) {
      return item.message;
    }).join(', ');
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = "Duplicate value entered for ".concat(Object.keys(err.keyValue), " field, please choose another value");
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = "No item found with id : ".concat(err.value);
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({
    msg: customError.msg
  });
};

var _default = errorHandlerMiddleware;
exports["default"] = _default;
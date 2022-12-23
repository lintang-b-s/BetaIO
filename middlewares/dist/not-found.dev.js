"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var notFound = function notFound(req, res) {
  res.status(404).send({
    msg: 'Route does not exist'
  });
};

var _default = notFound;
exports["default"] = _default;
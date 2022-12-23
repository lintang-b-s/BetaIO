"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orders = require("../controllers/orders.js");

var _auth = require("../middlewares/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get('', _auth.authenticateUser, (0, _auth.authorizeRoles)('admin', 'organizer', 'participant'), _orders.index);
router.put('/:id/:placeId/approve', _auth.authenticateUser, (0, _auth.authorizeRoles)('admin'), _orders.approvePayment);
var _default = router;
exports["default"] = _default;
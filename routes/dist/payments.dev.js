"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _payments = require("../controllers/payments.js");

var _auth = require("../middlewares/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get('/', _auth.authenticateUser, (0, _auth.authorizeRoles)('admin', 'organizer', 'participant'), _payments.index);
router["delete"]('/:id', _auth.authenticateUser, (0, _auth.authorizeRoles)('admin', 'organizer', 'participant'), _payments.destroy);
router.post('/', _auth.authenticateUser, (0, _auth.authorizeRoles)('admin', 'organizer', 'participant'), _payments.create);
var _default = router;
exports["default"] = _default;
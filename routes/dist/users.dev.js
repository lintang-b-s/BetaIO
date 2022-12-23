"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _user = require("../controllers/user.js");

var _auth = require("../controllers/auth.js");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _payments = require("../controllers/payments.js");

var _auth2 = require("../middlewares/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();

router.use(_bodyParser["default"].json());
/* GET users listing. */

router.route('/login').get(_user.renderLogin).post(_auth.signinCms);
router.route('/logout').get(_user.renderLogout)["delete"](_auth.logoutUserCms);
router.route('/signup').get(_user.renderRegister).post(_user.userRegister);
router.route('/putAuth').put(_auth.putAuthUserCms); // pindah route nya pake button href="..."

router.route('/:email/activate').get(_user.renderOTP).put(_auth.activateUserCms);
router.route('/addPayment').get(_auth2.authenticateUser, _user.renderPayment).put(_auth2.authenticateUser, _payments.create);
var _default = router;
exports["default"] = _default;
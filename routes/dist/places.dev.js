"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _places = require("../controllers/places.js");

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync.js"));

var _auth = require("../middlewares/auth.js");

var _multer = _interopRequireDefault(require("multer"));

var _index = require("../cloudinary/index.js");

var _authenticate = require("../middlewares/authenticate.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var upload = (0, _multer["default"])({
  storage: _index.storage
});
router.route('').get((0, _catchAsync["default"])(_places.index)).post(_auth.authenticateUser, upload.array('image'), _authenticate.validatePlace, (0, _catchAsync["default"])(_places.createPlace));
router.get('/new', _auth.authenticateUser, _places.renderNewForm);
router.route('/:id').get(_auth.authenticateUser, (0, _catchAsync["default"])(_places.showPlace)).put(_auth.authenticateUser, _authenticate.isAuthor, upload.array('image'), _authenticate.validatePlace, (0, _catchAsync["default"])(_places.updatePlace))["delete"](_auth.authenticateUser, _authenticate.isAuthor, (0, _catchAsync["default"])(_places.deletePlace));
router.get('/:id/edit', _auth.authenticateUser, _authenticate.isAuthor, (0, _catchAsync["default"])(_places.renderEditForm));
router.get('/:id/:ticketId/checkout', _auth.authenticateUser, (0, _auth.authorizeRoles)('participant', 'organizer'), _places.renderCheckout);
router.post('/:id/postcheckout', _auth.authenticateUser, (0, _auth.authorizeRoles)('participant', 'organizer'), _places.checkout);
router.get('/:id/:orderId/uploadPembayaran', _auth.authenticateUser, (0, _auth.authorizeRoles)('participant', 'organizer'), _places.renderUploadBuktiPembayaran);
router.put('/:id/checkout/:orderId', _auth.authenticateUser, (0, _auth.authorizeRoles)('participant', 'organizer'), upload.array('image'), _places.uploadBuktiPayment);
router.post('/tickets', _auth.authenticateUser, (0, _auth.authorizeRoles)('participant', 'organizer'), _places.createTickets);
var _default = router;
exports["default"] = _default;
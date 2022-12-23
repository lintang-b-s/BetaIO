"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    //reject file
    cb({
      message: 'Unsupported file format'
    }, false);
  }
};

var uploadMiddleware = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 3000000
  },
  fileFilter: fileFilter
});
var _default = uploadMiddleware;
exports["default"] = _default;
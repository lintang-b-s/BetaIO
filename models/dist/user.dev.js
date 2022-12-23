"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    "default": ''
  },
  email: {
    type: String,
    "default": ''
  },
  password: {
    type: String,
    "default": ''
  },
  otp: {
    type: String
  },
  role: {
    type: String,
    "enum": ['admin', 'organizer', 'participant'],
    "default": 'participant'
  },
  status: {
    type: String,
    "enum": ['aktif', 'tidak aktif'],
    "default": 'tidak aktif'
  }
}, {
  timestamps: true
});
UserSchema.pre('save', function _callee(next) {
  var User;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          User = this;

          if (!User.isModified('password')) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(User.password, 12));

        case 4:
          User.password = _context.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

UserSchema.methods.comparePassword = function _callee2(canditatePassword) {
  var isMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(canditatePassword, this.password));

        case 2:
          isMatch = _context2.sent;
          return _context2.abrupt("return", isMatch);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var User = _mongoose["default"].model("User", UserSchema);

var _default = User;
exports["default"] = _default;
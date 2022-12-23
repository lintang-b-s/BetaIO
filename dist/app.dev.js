"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ejsMate = _interopRequireDefault(require("ejs-mate"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _ExpressError = _interopRequireDefault(require("./utils/ExpressError.js"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _user = _interopRequireDefault(require("./models/user.js"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _cors = _interopRequireDefault(require("cors"));

var _games = _interopRequireDefault(require("./routes/games.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _places = _interopRequireDefault(require("./routes/places.js"));

var _payments = _interopRequireDefault(require("./routes/payments.js"));

var _orders = _interopRequireDefault(require("./routes/orders.js"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _errorMiddleware = require("./utils/error.middleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.NODE_ENV !== "production") {
  var _dirname = _path["default"].resolve();

  _dotenv["default"].config({
    path: _path["default"].resolve(_dirname, '.env')
  });
}

var MongoStore = _connectMongo["default"];
var dbUrl = process.env.DB_URL;
(0, _db["default"])();
var app = (0, _express["default"])();

var _dirname2 = _path["default"].resolve(); // view engine setup


app.engine('ejs', _ejsMate["default"]);
app.set('view engine', 'ejs');
app.set('views', _path["default"].join(_dirname2, 'views'));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _methodOverride["default"])('_method'));
app.use(_express["default"]["static"](_path["default"].join(_dirname2, 'public')));
app.use((0, _expressMongoSanitize["default"])());
var secret = process.env.SECRET || 'we;irsufnw;eorfw;wiruwf;irgfb';
var store = MongoStore.create({
  mongoUrl: dbUrl,
  secret: secret,
  touchAfter: 24 * 60 * 60 // in SECONDS

});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR: ", e);
});
var sessionConfig = {
  store: store,
  secret: secret,
  resave: false,
  saveUninitialised: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use((0, _expressSession["default"])(sessionConfig)); // app.use(flash());

var scriptSrcUrls = ["https://stackpath.bootstrapcdn.com/", "https://api.tiles.mapbox.com/", "https://api.mapbox.com/", "https://kit.fontawesome.com/", "https://cdnjs.cloudflare.com/", "https://cdn.jsdelivr.net", "https://npmcdn.com/@turf/turf/turf.min.js", "https://cdnjs.cloudflare.com/ajax/libs/mapbox-polyline/1.1.1/polyline.j", "https://code.jquery.com/jquery-3.6.1.min.js", "https://api.openweathermap.org", "https://code.jquery.com/jquery-3.3.1.min.js", "http://openweathermap.org/img/w/", "https://unpkg.com/aos@2.3.1/dist/aos.js", "http://localhost:3000"];
var styleSrcUrls = ["https://kit-free.fontawesome.com/", "https://stackpath.bootstrapcdn.com/", "https://api.mapbox.com/", "https://api.tiles.mapbox.com/", "https://fonts.googleapis.com/", "https://use.fontawesome.com/", "https://cdn.jsdelivr.net", "https://api.openweathermap.org", "http://openweathermap.org/img/w/", "https://code.jquery.com/jquery-3.3.1.min.js", "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", "https://unpkg.com/aos@2.3.1/dist/aos.js", "https://stackpath.bootstrapcdn.com/", "https://unpkg.com/aos@2.3.1/dist/aos.css", "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"];
var connectSrcUrls = ["https://api.mapbox.com/", "https://a.tiles.mapbox.com/", "https://b.tiles.mapbox.com/", "https://events.mapbox.com/", "https://api.openweathermap.org", "https://code.jquery.com/jquery-3.3.1.min.js", "http://openweathermap.org/img/w/"];
var fontSrcUrls = ["https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"];
var frameSrcUrls = ["http://localhost:3000/assets/testgame2/index.html"];
app.use(_helmet["default"].contentSecurityPolicy({
  directives: {
    defaultSrc: [],
    connectSrc: ["'self'"].concat(connectSrcUrls),
    scriptSrc: ["'unsafe-inline'", "'unsafe-eval'", "'self'"].concat(scriptSrcUrls),
    styleSrc: ["'self'", "'unsafe-inline'"].concat(styleSrcUrls),
    workerSrc: ["'self'", "blob:"],
    frameSrc: ["'self'", "blob:", frameSrcUrls],
    objectSrc: [],
    imgSrc: ["'self'", "blob:", "data:", "https://res.cloudinary.com/tutorial-lntng/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
    "https://images.unsplash.com/", "http://openweathermap.org/img/w/"],
    fontSrc: ["'self'"].concat(fontSrcUrls)
  }
})); // app.use((req, res, next) => {
//   // res.locals.currentUser = req.user;
//   // console.log('req.user: app  ' , req.user)
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// });
// error di app confignya, 
// pas config session selalu ke route logout

app.use('/', _users["default"]);
app.use('/places', _places["default"]);
app.use('/payments', _payments["default"]);
app.use('/orders', _orders["default"]);
app.use('/games', _games["default"]);
app.get('/', function (req, res) {
  res.render('home');
});
app.use(_errorMiddleware.notFound);
app.use(_errorMiddleware.errorHandler);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server berjalan di mode ".concat(process.env.NODE_ENV, " pada port").concat(port));
});
var _default = app;
exports["default"] = _default;
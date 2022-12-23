import dotenv from 'dotenv';
if (process.env.NODE_ENV !== "production") {
  const __dirname = path.resolve();
  dotenv.config({
      path: path.resolve(__dirname, '.env')
    })
  }



import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import flash from 'connect-flash';
import ExpressError from './utils/ExpressError.js';
import methodOverride from 'method-override';

import User from './models/user.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import connectMongo from 'connect-mongo'
import cors from 'cors';
import gameRoutes from "./routes/games.js"
import userRoutes from './routes/users.js';
import placeRoutes from './routes/places.js';
import paymentRoutes from "./routes/payments.js";
import orderRoutes from "./routes/orders.js"
import connectDB from './config/db.js';
import { notFound, errorHandler }  from "./utils/error.middleware.js" ;





const MongoStore = connectMongo;
const dbUrl = process.env.DB_URL 
connectDB();
var app = express();
const __dirname = path.resolve();

// view engine setup
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());


const secret = process.env.SECRET || 'we;irsufnw;eorfw;wiruwf;irgfb';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60, // in SECONDS
});


store.on("error", function(e) {
    console.log("SESSION STORE ERROR: ", e);
});

const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialised: true,
  cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,

  }
};

app.use(session(sessionConfig));
// app.use(flash());


const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
  "https://npmcdn.com/@turf/turf/turf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/mapbox-polyline/1.1.1/polyline.j",
  "https://code.jquery.com/jquery-3.6.1.min.js",
  "https://api.openweathermap.org",
  
  "https://code.jquery.com/jquery-3.3.1.min.js",
  "http://openweathermap.org/img/w/",
  "https://unpkg.com/aos@2.3.1/dist/aos.js",
  "http://localhost:3000"
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
  "https://api.openweathermap.org",
  "http://openweathermap.org/img/w/",

  
  "https://code.jquery.com/jquery-3.3.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
  "https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://unpkg.com/aos@2.3.1/dist/aos.js",
  "https://stackpath.bootstrapcdn.com/",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
  
  
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
  "https://api.openweathermap.org",
  "https://code.jquery.com/jquery-3.3.1.min.js",
  "http://openweathermap.org/img/w/"
];
const fontSrcUrls = ["https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",];

const frameSrcUrls = ["http://localhost:3000/assets/testgame2/index.html"]
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'","'unsafe-eval'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          frameSrc: ["'self'", "blob:", frameSrcUrls],
       
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/tutorial-lntng/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com/",
              "http://openweathermap.org/img/w/"
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);
 


// app.use((req, res, next) => {
//   // res.locals.currentUser = req.user;
//   // console.log('req.user: app  ' , req.user)
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// });

// error di app confignya, 
// pas config session selalu ke route logout
app.use('/', userRoutes);
app.use('/places', placeRoutes);
app.use('/payments', paymentRoutes);
app.use('/orders', orderRoutes);
app.use('/games', gameRoutes )
app.get('/', (req, res) => {
  res.render('home');
})




app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di mode ${process.env.NODE_ENV} pada port${port}`)
})

export default app;


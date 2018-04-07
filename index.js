const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cookieSession = require( 'cookie-session' )
const passport = require( 'passport' );
const keys = require( './config/keys.js' )
require( './models/User.js' )
require( './services/passport.js' )

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    // this function needs configuation object, 2 different properties
    maxAge: 5 * 60 * 1000, // in miliseconds
    keys: [keys.cookieKey] // encrypt the cookie key, additional level of security
  })
);

app.use(passport.initialize());
app.use(passport.session());


// immediate function call with app argument;
require('./routes/authRoutes')(app);


// whenever Heroku runs deploy this app, it passes its ENV variable to here, if we are not in production we use 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);

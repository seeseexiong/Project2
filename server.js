/* //------------------------------------------------------------
  SERVER.JS 
*/ //-------------------------------------------------------------

// Require ======================================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport'); 

// Port and Models
var models = require("./models");
var PORT = process.env.PORT || 3000;


// Express --------------------------
var app = express();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Passport --------------------------
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Handlebars --------------------------
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes ======================================================
<<<<<<< HEAD
require("./routes/apiRoutes")(app);
//require("./routes/auth.js")(app, passport);
require("./routes/htmlRoutes")(app);
=======
require("./routes/apiRoutes")(app, passport);
require("./routes/auth.js")(app, passport);
require("./routes/htmlRoutes")(app, passport);
>>>>>>> ef109913fef29ac5d2fc7b1aee95e85ea6890252


//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ==========================================
models.sequelize.sync(syncOptions).then(function() {
  console.log(process.env.NODE_ENV)
  app.listen(PORT, function() {
    console.log(
      "Some badass people starting baddass servers on: http://localhost:" + PORT);
    
  });
});


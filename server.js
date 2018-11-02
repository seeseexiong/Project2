/* //------------------------------------------------------------
  SERVER.JS 
*/ //-------------------------------------------------------------

// Require ======================================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

var db = require("./models");

// Express
var app = express();
var PORT = process.env.PORT || 3000;

// Passport 
const passport = require('./config/passport/passport-init');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Middleware Config ======================================================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes ======================================================
require("./routes/apiRoutes")(app, passport);
require("./routes/auth.js")(app, passport);
require("./routes/htmlRoutes")(app, passport);


//load passport strategies
require('./config/passport/passport.js');


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ==========================================
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT,
    );
    
  });
});

//module.exports = app;

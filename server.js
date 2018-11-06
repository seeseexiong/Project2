/* //------------------------------------------------------------
  SERVER.JS 567
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
const serve = require('express-static')

// Port and Models
var models = require("./models");
var PORT = process.env.PORT || 3000;


// Express --------------------------
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Passport --------------------------
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Static
app.use(serve('public'))


// Handlebars --------------------------
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'));

// app.engine('handlebars', exphbs({
//   extname: '.handlebars',
//   defaultLayout: 'main',
//   partialsDir: path.join(__dirname, '/views/partials'),
//   layoutsDir: path.join(__dirname, '/views/layouts')
// }));
// app.set('view engine', 'handlebars');
// app.set('views',path.join(__dirname,'/views'));



// Routes ======================================================

//require("./routes/apiRoutes")(app, passport);
require("./routes/auth.js")(app, passport);
//require("./routes/htmlRoutes")(app, passport);


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


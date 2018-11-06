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
const static = require('express-static')

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
// app.use(express.static('public'));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + 'public/index.html'));
// });
// app.get('/user', function(req, res) {
//   res.sendFile(path.join(__dirname + '/public/user.html'));
// });


// Routes ======================================================
// USER page ========================================================
app.get('/user', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/user.html'));
});
// Stories page ========================================================
app.get('/stories', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/stories.html'));
});
// Blog Post page ========================================================
app.get('/blog-post', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/blog-post.html'));
});
// Friends & Followers page ========================================================
app.get('/friends', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/friends.html'));
});


//require("./routes/apiRoutes")(app, passport);
require("./routes/auth.js")(app, passport);
require("./routes/htmlRoutes.js")(app, passport);


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


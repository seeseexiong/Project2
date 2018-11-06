/* // ======================================
Configuring Passport for Local Accounts
*/ //======================================

//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  // serialize the user
  passport.serializeUser(function (user, done) {
    console.log("serializing user:", user.id);
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function (savedId, done) {
    console.log("Deserializing user: ", savedId)
    User.findById(savedId).then(function (user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });

  // Local SignUp --> Creating a new user =======================================================
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    // hash password with bCrypt before saving into database
    function (req, email, password, done) {
      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      // look in database to see if that email is already in use 
      User.findOne({ where: { email: email } }).then(function (user) {
        if (user) {
          return done(null, false, { message: 'That email is already taken' });
        }
        else {
          var userPassword = generateHash(password);
          var data =
          {
            email: email,
            password: userPassword,
            name: req.body.name,
            username: req.body.username
          };

          User.create(data).then(function (newUser, created) {
            if (!newUser) {
              return done(null, false);
            }

            if (newUser) {
              return done(null, newUser);

            }
          });
        }
      });

    }

  ));

  //LOCAL SIGNIN =======================================================
  passport.use('local-signin', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req, username, password, done) {
      var User = user;
      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }
      User.findOne({ where: { username: username } }).then(function (user) {

        if (!user) {
          return done(null, false, { message: 'Username does not exist' });
        }
        if (!isValidPassword(user.password, password)) {

          return done(null, false, { message: 'Incorrect password.' });

        }
        var userinfo = user.get();
        return done(null, userinfo);

      }).catch(function (err) {
        console.log("Error:", err);
        return done(null, false, { message: 'Something went wrong with your Signin' });
      });

    }
  ));

}


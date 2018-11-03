/* // ======================================
Configuring Passport for Local Accounts
*/ //======================================

// Config Passport =====================================
let Strategy = require('passport-local').Strategy;
let User = require('../../models/user')


//A strategy is the way we are authenticating. A local stategy is one that doesn't user 3rd party auth.
//This is the simplest strategy. We are storing the username and password in plaintext in the db (I know, I know. super insecure. It's just an example, don't judge)
//To authenticate:
// 1. check if the user is in the database 
// 2. check if the password matches
const strategy = new Strategy(
    // 
    // {
    // usernameField: 'email',
    // passwordField: 'passwd'
    // },
    //{  session: true },
    //Passport will give us the username and password and the "done" function. 
    function (username, password, done) {

        //our user is in Sequelize,
        User.findOne({
            where: { username: username }
        }).then(
            function (DBuser) {
                console.log("Back from the database! Let's check if our credentials are good: ");

                if (!DBuser) {
                    console.log("User " + username + " was not in the DB");
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!DBuser.validPassword(password)) {
                    // if (!(DBuser.password===password)) {
                    console.log("Password " + password + " does not match the password in the DB: " + DBuser.password); //For the love of all that is good and secure, never console log user passwords in a production app

                    return done(null, false, { message: 'Incorrect password.' });
                }
                // if the user exists, and the passwords match, we have a successful Authentication! 
                // return the user object. This will get saved in req.user
                console.log("They are!");
                return done(null, DBuser);
            }

        )
            .catch(err => {
                return done(err, false, { message: 'Some DB error:' });
            })
            ;
    }
);

// Passport Init
let passport = require('passport');
let session = require("express-session")({ secret: "ctiosckzhgkyntvitviaw4", resave: false, saveUninitialized: false  });
let flash = require('connect-flash');


//==================================================================================================
// Sessions and User Serialization/Deserialization
//==================================================================================================

const serializeUser = function(user, done) {
    const id = (user.id? user.id: user[0].id) //might be differe
    console.log("serializing user:", id)
    //user.save();
    done(null, id);//save the user's id in the cookie. This is how Passport wants you to do this. 
  }
  
  const deserializeUser = function(savedId, done) {
      console.log("Deserializing user: ", savedId)
      
      User.findOne({ 
          where:{ id: savedId },
          attributes: {
            exclude: ["password"] //user has the password in it, let's filter that out...for...security.......yes, I know we saved the password in db in plaintext...get off my back
          }
      }) 
      .then(function(user) {
          console.log("Got user:", user)
  
          done(null, user);//We have successfully deserialized our user. Call done() with null as the first arg, since no errors.
          //you can now get your user info in req.user
      })
      .catch(function(err){
        //check for errors...
          console.log("Failed to get user:", err)
          done(err, null)
      })
      
  }
  

module.exports = function(app) {
  passport.use(strategy); //initialize passport strategies

  //===============BOILERPLATE
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.use(session);  

  //initialize Passport and let Express know about it
  app.use(passport.initialize());
  // Set up sessions 
  app.use(passport.session());

  //==============END BOILERPLATE

  //Initialize authentication specific routes. This needs to be changed to match your configs
  app.use(
    require("../../routes/auth")(passport)
    )

  return passport;

}


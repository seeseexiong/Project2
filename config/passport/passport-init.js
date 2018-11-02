// Passport Init

let passport      = require('passport');
let session       = require("express-session")({ secret: "ctiosckzhgkyntvitviaw4", resave: false, saveUninitialized: false  });


let User = require ('../../models/user');

module.exports = function(app) {
  passport.use(require('./passport'))

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
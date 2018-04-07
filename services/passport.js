
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

// set cookie
passport.serializeUser((user,done) =>{
  // user here is the Mongodb instance coming back from the server "_id":{"$old":"12312313"}
  // we use the mongo userdb instance because we might use facebook, instagram, etc. so we don't use soecifically google profile.id
  done(null, user.id);
})



passport.deserializeUser((id, done) =>{
  // search all users
  User.findById(id).then((foundUser)=>{
    done(null, foundUser);
  });
});



// mongoose.model(), 1 argument means Get, 2 arguments means Post;
const User = mongoose.model('users');
// console.developer.google..com
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken == ',accessToken)
      console.log('refreshToken == ',refreshToken)
      console.log('profile == ',profile)
      User.findOne({ googleId: profile.id }).then((foundUser)=>{
        if(foundUser){
          // if e exists, then we already have a user with the same ID
          console.log("user "+ profile.displayName + " already exists")
          // let passport know the promise went well, done function("errors",obj),
          done(null,foundUser) // in this instance we pass null errors, and found user obj
        }else{
          // create a new instance of Mongo model instance, then save it, then we get another instance of saved Mongodb model instance at ".then", so the first "new User" Model and .then Model are 2 different instances.
          new User({ googleId: profile.id, displayName: profile.displayName })
          .save()
          .then( user => done(null, user) ); // this "user" is returned from promise obj
        }
      })


    }
  )
);

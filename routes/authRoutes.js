// omport passport npm module
const passport = require('passport');

module.exports = (app) =>{
  // we ask for the email and profile from google scope and permission
  app.get(
    '/auth/google',
    passport.authenticate('google',{
      scope: ['profile', 'email']
    })
  );
  app.get('/auth/google/callback', passport.authenticate('google'));
  app.get('/api/logout',  (req,res) => {
    req.logout(); // attach automatically to passport, it takes the cookie and delete the user that is in it.
    res.send(req.user) // this prove the user that this user is no longer signed in.
  });

  app.get('/api/current_user', (req,res) => {
    res.send(req.user); //
  });








};

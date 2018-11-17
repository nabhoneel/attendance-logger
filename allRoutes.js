const passport = require('passport');
const mongoose = require('mongoose');

const requireLogin = require('./config/requireLogin');
const attendance = require('./models/Attendance');

const Attendance = mongoose.model('attendance');

module.exports = (app) => {
  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      console.log('callback');
      res.redirect('/');
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', requireLogin, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/create_current_log', (req, res) => {
    attendance.updateDailyLog(null, res);
  });

  app.get('/api/get_current_log', (req, res) => {
    attendance.getLog(res);
  });

  app.post('/api/student', requireLogin, (req, res) => {
    const going = req.body.going;
    const googleID = req.user.googleID;
    
    if(going == 'true') attendance.markGoing(googleID, res);
    else if(going == 'false') attendance.markNotGoing(googleID, res);
  });

  app.post('/api/reason', requireLogin, (req, res) => {
    const googleID = req.user.googleID;
    const text = req.body.reason;

    attendance.setReason(googleID, text, res);
  });

  app.get('/api/reason', (req, res) => {
    attendance.getReason(res);
  });
  
  app.get('/api', (req, res) => {
  });  
}
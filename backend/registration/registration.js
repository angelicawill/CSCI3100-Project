const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth');
const passport = require('passport');
const flash = require('connect-flash');

/* Create page */
router.get('/register', (req, res, next) => {
  const messages = req.flash();
  res.render('register', { messages });
});

/* Handle register request */
router.post('/register', (req, res, next) => {
  const registerInfo = req.body;
  const users = req.app.locals.users;
  const userInfo = {
	name: registerInfo.name,
	phoneNum: registerInfo.phoneNum,
    username: registerInfo.username,
    password: authUtils.hashPassword(registerInfo.password),
  };

  users.insertOne(userInfo, (err) => {
    if (err) {
      req.flash('error', 'User account already exists.');
    } else {
      req.flash('success', 'User account registered successfully.');
    }

    res.redirect('/auth/register');
  })
});

module.exports = router;

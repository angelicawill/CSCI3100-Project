const express = require('express');
const router = express.Router();
const { addUser } = require('../database/user');
const { hashPassword } = require('../hashPassword');
// const authUtils = require('../utils/auth');
// const passport = require('passport');
// const flash = require('connect-flash');

/* Create page */
// router.get('/register', (req, res, next) => {
//   const messages = req.flash();
//   res.render('register', { messages });
// });

/* Handle register request */
router.post('/register', async (req, res, next) => {
    console.log('/registration/register post request');
    console.log(req.body);
    const registerInfo = req.body;
    const users = req.app.locals.users;
    const userInfo = {
        realname: registerInfo.realname,
        username: registerInfo.username,
        password: hashPassword(registerInfo.password),
        phonenumber: registerInfo.phonenumber,
        email: registerInfo.email,
        role: registerInfo.role
    };

    let success = await addUser(userInfo);

    // users.insertOne(userInfo, (err) => {
    //     if (err) {
    //         req.flash('error', 'User account already exists.');
    //     } else {
    //         req.flash('success', 'User account registered successfully.');
    //     }

    //     res.redirect('/auth/register');
    // })
    console.log(success)
    res.send({
        success: success
    })
    // res.redirect('/login')
});

module.exports = router;

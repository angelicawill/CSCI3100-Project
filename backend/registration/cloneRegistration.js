const express = require('express');
const router = express.Router();
const { addUser, setVerified } = require('../database/user');
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
    let returnObject = {
        success: false
    }
    let status = 500;

    const registerInfo = req.body;
    const users = req.app.locals.users;


    try {
        // check realname
        if (!registerInfo.realname || typeof registerInfo.realname != 'string') {
            status = 400;
            return;
        }

        // check username
        if (!registerInfo.username || typeof registerInfo.username != 'string') {
            status = 400;
            return;
        }

        // check password
        if (!registerInfo.password || typeof registerInfo.password != 'string') {
            status = 400;
            return;
        }

        // check phonenumber
        if (!registerInfo.phonenumber || typeof registerInfo.phonenumber != 'string') {
            status = 400;
            return;
        }

        // check email
        if (!registerInfo.email || typeof registerInfo.email != 'string' || !/\S+@\S+\.\S+/.test(registerInfo.email)) {
            status = 400;
            return;
        }

        // check role
        if (!registerInfo.role || (registerInfo.role !== 'tutor' && registerInfo.role !== 'student')) {
            status = 400;
            return;
        }

        const userInfo = {
            realname: registerInfo.realname,
            username: registerInfo.username,
            password: hashPassword(registerInfo.password),
            phonenumber: parseInt(registerInfo.phonenumber),
            email: registerInfo.email,
            role: registerInfo.role
        };
    
        if (!await addUser(userInfo)) return;
        if (!await setVerified({username: userInfo.username})) return;

        status = 200;
        returnObject.success = true;
    } catch (e) {
        console.log(e);
    } finally {
        res.status(status).send(returnObject);
    }

    // users.insertOne(userInfo, (err) => {
    //     if (err) {
    //         req.flash('error', 'User account already exists.');
    //     } else {
    //         req.flash('success', 'User account registered successfully.');
    //     }

    //     res.redirect('/auth/register');
    // })
    // res.redirect('/login')
});

module.exports = router;

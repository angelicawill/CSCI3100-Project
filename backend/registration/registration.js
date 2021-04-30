const express = require('express');
const router = express.Router();
const { addUser, setVerified, getUserBasicInfo } = require('../database/user');
const { hashPassword } = require('../hashPassword');

/* Handle register request */
router.post('/', async (req, res, next) => {
    console.log('/registration/register post request');
    let returnObject = {
        success: false,
        user: null
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
        if (!registerInfo.phonenumber || typeof registerInfo.phonenumber != 'string' || !parseInt(registerInfo.phonenumber)) {
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
        if (!await setVerified({ username: userInfo.username })) return;

        let user = await getUserBasicInfo({ username: userInfo.username })

        req.logIn(user, async (err) => {
            if (err) {
                return status = 500
            }

            status = 200;
            returnObject.success = true;
            returnObject.user = user;
        })

    } catch (e) {
        console.log(e);
    } finally {
        res.status(status).send(returnObject);
    }
});

module.exports = router;

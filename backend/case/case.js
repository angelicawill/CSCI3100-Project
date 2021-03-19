var express = require('express')
var router = express.Router()
// data for testing
let cases = [
    {
        caseid: 111,
        studentid: [Number],
        tutorid: Number,
        createAt: { type: Date, default: new Date() },
        isClosed: { type: Boolean, default: false }
    }
]


router.post('/startcase', (req, res) => {
    // Return this
    let returnObject = {
        case: null,
        msg: null,
        success: false
    }
    let status = 500;

    let body = req.body;
    let user = req.user;
    console.log(user);
    if (user.role == "tutor") {
        // startCase(user.userid)
        returnObject.case = {
            caseid: 111,
            studentid: [],
            tutorid: user.userid,
            createAt: Date.now(),
            isClosed: false
        }
        returnObject.success = true;
        status = 200;

    } else {
        returnObject.msg = "user is not tutor"
    }

    res.status(status).send(returnObject);
})

router.post('/invitetocase', (req, res) => {
    let returnObject = {
        case: null,
        msg: null,
        success: false
    }
    let status = 500;

    let body = req.body;
    let user = req.user;
    if (user.role == "tutor") {
        console.log(req.body);
        if (body.studentList && body.caseid && user.userid) {
            // inviteToCase(body.studentList, user.userid);
            returnObject.case = {
                caseid: 111,
                studentid: body.studentList,
                tutorid: user.userid,
                createAt: Date.now(),
                isClosed: false
            }
            returnObject.success = true;

            status = 200;

        } else {
            returnObject.msg = "bad request"
        }
    } else {
        returnObject.msg = "user is not tutor"
    }

    res.status(status).send(returnObject);
})

router.post('/finishcase', (req, res) => {
    let returnObject = {
        case: null,
        msg: null,
        success: false
    }
    let status = 500;

    let body = req.body;
    let user = req.user;
    if (user.role == "tutor") {
        if (body.caseid && user.userid) {
            // finishCase(user.userid, body.caseid);
            returnObject.case = {
                caseid: 111,
                studentid: [],
                tutorid: user.userid,
                createAt: Date.now(),
                isClosed: true
            }
            returnObject.success = true;

            status = 200;

        } else {
            returnObject.msg = "bad request"
        }
    } else {
        returnObject.msg = "user is not tutor"
    }

    res.status(status).send(returnObject);
})

router.post('/acceptcase', (req, res) => {
    let returnObject = {
        case: null,
        msg: null,
        success: false
    }
    let status = 500;

    let body = req.body;
    let user = req.user;
    if (user.role == "student") {
        if (body.caseid && user.userid) {
            if (body.accept) {
                returnObject.case = {
                    caseid: 111,
                    studentid: [],
                    tutorid: user.userid,
                    createAt: Date.now(),
                    isClosed: true
                }
            }
            returnObject.success = true;

            status = 200;
        } else {
            returnObject.msg = "bad request"
        }
    } else {
        returnObject.msg = "user is not student"
    }

    res.status(status).send(returnObject);
})

module.exports = router

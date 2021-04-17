const express = require('express');
const router = express.Router();

router.post('/startcase', require('./startCase'));
router.post('/finishcase', require('./finishCase'));

router.post('/acceptstudentrequest', require('./acceptStudentRequest'));
router.post('/rejectstudentrequest', require('./rejectStudentRequest'));


module.exports = router

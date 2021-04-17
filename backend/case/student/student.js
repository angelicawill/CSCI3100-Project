const express = require('express');
const router = express.Router();

router.post('/requesttutor', require('./requestTutor'));
router.post('/cancelrequesttutor', require('./cancelRequestTutor'));

module.exports = router;
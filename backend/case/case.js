const express = require('express')
const router = express.Router()
const { users, chats, cases } = global.dixontest;
router.use((req, res, next) => {
    console.log('case router received request');
    next();
})
// /***********   start case   ***********/
// No required data
// return {
//     userRoleMatch: false,
//     case: null,
//     success: false,
//     serverError: true
// }
router.post('/startcase', require('./startcase')); 


// /***********   invite to case   ***********/
// required data: {
//     studentidList, // List of student ID that want to invite
//     caseid // ID of the case want to invite students to
// }
// return {
//     studentidListValid: false,
//     caseidValid: false,
//     studentExist: false,
//     caseExist: false,
//     userRoleMatch: false,
//     userInCase: false,
//     case: null,
//     success: false,
//     serverError: true
// }
router.post('/invitetocase', require('./invitetocase')) 


// /***********   accept case   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     userInCaseInvitation: false,
//     case: null,
//     success: false,
//     serverError: true
// }
router.post('/acceptcase', require('./acceptcase'))


// /***********   finish case   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     userInCase: false,
//     success: false,
//     serverError: true
// }
router.post('/finishcase', require('./finishcase'))

module.exports = router

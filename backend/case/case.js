// ████████╗██╗░░░██╗████████╗░█████╗░██████╗░
// ╚══██╔══╝██║░░░██║╚══██╔══╝██╔══██╗██╔══██╗
// ░░░██║░░░██║░░░██║░░░██║░░░██║░░██║██████╔╝
// ░░░██║░░░██║░░░██║░░░██║░░░██║░░██║██╔══██╗
// ░░░██║░░░╚██████╔╝░░░██║░░░╚█████╔╝██║░░██║
// ░░░╚═╝░░░░╚═════╝░░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝
// /***********   Start case   ***********/
// /case/tutor/startcase
// method: POST
// return: {
//     userRoleMatch: boolean
//     tutor: object // tutor object in database
//     success: boolean
//     serverError: boolean
// }

// /***********   Finish case   ***********/
// /case/tutor/finishcase
// method: POST
// body: {
//     caseid: number // The id of case want to finish
// }
// return: {
//     userRoleMatch: boolean
//     tutor: object // tutor object in database
//     success: boolean
//     serverError: boolean
// }

// /***********   Accept student request   ***********/
// /case/tutor/acceptstudentrequest
// method: POST
// body: {
//     studentid: number // The id of student want to add to case
//     caseid: number // The id of case want to add student to
// }
// return: {
//     userRoleMatch: boolean
//     tutor: object // tutor object in database
//     success: boolean
//     serverError: boolean
// }

// /***********   Reject student request   ***********/
// /case/tutor/rejectstudentrequest
// method: POST
// body: {
//     studentid: number // The id of student want to reject
// }
// return: {
//     userRoleMatch: boolean
//     tutor: object // tutor object in database
//     success: boolean
//     serverError: boolean
// };


// ░██████╗████████╗██╗░░░██╗██████╗░███████╗███╗░░██╗████████╗
// ██╔════╝╚══██╔══╝██║░░░██║██╔══██╗██╔════╝████╗░██║╚══██╔══╝
// ╚█████╗░░░░██║░░░██║░░░██║██║░░██║█████╗░░██╔██╗██║░░░██║░░░
// ░╚═══██╗░░░██║░░░██║░░░██║██║░░██║██╔══╝░░██║╚████║░░░██║░░░
// ██████╔╝░░░██║░░░╚██████╔╝██████╔╝███████╗██║░╚███║░░░██║░░░
// ╚═════╝░░░░╚═╝░░░░╚═════╝░╚═════╝░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░
// /***********   Request tutor   ***********/
// /case/student/requesttutor
// method: POST
// body: {
//     tutorid: number // The id of tutor want to request
// }
// return: {
//     userRoleMatch: boolean
//     student: object // student object in database
//     success: boolean
//     serverError: boolean
// };

// /***********   Cancel request tutor   ***********/
// /case/student/cancelrequesttutor
// method: POST
// body: {
//     tutorid: number // The id of tutor want to request
// }
// return: {
//     userRoleMatch: boolean
//     student: object // student object in database
//     success: boolean
//     serverError: boolean
// };




const express = require('express')
const router = express.Router()

router.use('/tutor', require('./tutor/tutor'));
router.use('/student', require('./student/student'));


module.exports = router;
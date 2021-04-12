// ▀█▀ █░█ ▀█▀ █▀█ █▀█
// ░█░ █▄█ ░█░ █▄█ █▀▄
// /***********   /case/tutor/startcase   ***********/
// No required data
// return {
//     userRoleMatch: false,
//     case: null,
//     success: false,
//     serverError: true
// }
// /***********   /case/tutor/finishcase   ***********/
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
/***********   /case/tutor/addtoinvitation   ***********/
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
// /***********   /case/tutor/removefrominvitation   ***********/
// required data: {
//     studentidList, // List of student ID that want to invite
//     caseid // ID of the case want to invite students to
// }
// return {
//     studentidListValid: false,
//     caseidValid: false,
//     caseExist: false,
//     studentExist: false,
//     studentsInCaseInvitation: false,
//     userRoleMatch: false,
//     userInCase: false,
//     case: null,
//     success: false,
//     serverError: true
// }
// /***********   /case/tutor/removefromcase   ***********/
// required data: {
//     studentidList, // List of student ID that want to invite
//     caseid // ID of the case want to invite students to
// }
// return {
//     studentidListValid: false,
//     caseidValid: false,
//     caseExist: false,
//     studentExist: false,
//     studentsInCase: false,
//     userRoleMatch: false,
//     userInCase: false,
//     case: null,
//     success: false,
//     serverError: true,
//   }
//   /***********   /case/tutor/getcase   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     case: null,
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     userInCase: false,
//     success: false,
//     serverError: true,
//   }


// █▀ ▀█▀ █░█ █▀▄ █▀▀ █▄░█ ▀█▀
// ▄█ ░█░ █▄█ █▄▀ ██▄ █░▀█ ░█░
// /***********   /case/student/acceptcase   ***********/
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
/***********   /case/student/getoutfrominvitation   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     studentidListValid: false,
//     caseidValid: false,
//     caseExist: false,
//     studentExist: false,
//     studentsInCase: false,
//     userRoleMatch: false,
//     userInCaseInvitation: false,
//     case: null,
//     success: false,
//     serverError: true
// }
// /***********   /case/student/getoutfromcase   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     userInCase: false,
//     case: null,
//     success: false,
//     serverError: true,
//   }
//   /***********   /case/student/getcase   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     case: null,
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     userInCase: false,
//     success: false,
//     serverError: true,
//   }


// ▄▀█ █▀▄ █▀▄▀█ █ █▄░█
// █▀█ █▄▀ █░▀░█ █ █░▀█
//   /***********   /case/admin/getcase   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     case: null,
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     success: false,
//     serverError: true,
//   }
//     /***********   /case/admin/createcase   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     case: null,
//     userRoleMatch: false,
//     success: false,
//     serverError: true,
//   }
//     /***********   /case/admin/deletecase   ***********/
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     caseidValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     success: false,
//     serverError: true,
//   }
//     /***********   /case/admin/updatecase   ***********/
// required data: {
//     caseid: Number,// ID of the case want to invite students to
//     studentids?: Number[],
//     invitingStudentid?: Number[],
//     tutorid?: Number,
//     createAt?: Number,
//     isClosed?: Boolean
// }
// return {
//     caseidValid: false,
//     dataValid: false,
//     caseExist: false,
//     userRoleMatch: false,
//     case: null,
//     success: false,
//     serverError: true,
//   }



const express = require('express')
const router = express.Router()

router.use('/tutor', require('./tutor/tutor').default);
router.use('/student', require('./student/student').default);
router.use('/admin', require('./admin/admin').default);


export default router;
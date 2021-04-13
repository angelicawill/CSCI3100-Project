"use strict";
// ▀█▀ █░█ ▀█▀ █▀█ █▀█
// ░█░ █▄█ ░█░ █▄█ █▀▄
// /***********   /case/tutor/startcase   ***********/
// method: post
// No required data
// return {
//     userRoleMatch: false,
//     tutor: null, // return all information of tutor
//     success: false,
//     serverError: true
// }
/***********   /case/tutor/invitetocase   ***********/
// method: put
// required data: {
//     studentidList, // List of student ID that want to invite
//     caseid // ID of the case want to invite students to
// }
// return {
//     success: false,
//     serverError: true
// }
// /***********   /case/tutor/finishcase   ***********/
// method: put
// required data: {
//     caseid // ID of the case want to invite students to
// }
// return {
//     success: false,
//     serverError: true
// }
exports.__esModule = true;
var express = require('express');
var router = express.Router();
router.use('/tutor', require('./tutor/tutor')["default"]);
// router.use('/student', require('./student/student').default);
// router.use('/admin', require('./admin/admin').default);
exports["default"] = router;

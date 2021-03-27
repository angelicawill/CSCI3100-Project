"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        caseidValid: false,
        dataValid: false,
        caseExist: false,
        userRoleMatch: false,
        "case": null,
        success: false,
        serverError: true
    };
    var status = 500;
    var _a = req.body, caseid = _a.caseid, studentids = _a.studentids, invitingStudentid = _a.invitingStudentid, tutorid = _a.tutorid, createAt = _a.createAt, isClosed = _a.isClosed;
    var user = req.user;
    try {
        var dataSyntaxValid_1 = false;
        var dataExist_1 = false;
        var haveAccessRight = false;
        (function () {
            var casee;
            /***********   Check have access right   ***********/
            if (user.role === "admin") {
                returnObject.userRoleMatch = true;
            }
            if (!returnObject.userRoleMatch) {
                return;
            }
            else {
                returnObject.userRoleMatch = true;
                /***********   Check syntax valid   ***********/
                var checkstudentids = false;
                var checkinvitingStudentid = false;
                var checktutorid = false;
                var checkcreateAt = false;
                var checkisClosed = false;
                if (typeof caseid === "number" && Number.isInteger(caseid)) {
                    returnObject.caseidValid = true;
                }
                if (studentids) {
                    if (Array.isArray(studentids) && studentids.length &&
                        studentids.every(function (id) {
                            return typeof id === "number" && Number.isInteger(id);
                        })) {
                        checkstudentids = true;
                    }
                }
                else {
                    checkstudentids = true;
                }
                if (invitingStudentid) {
                    if (Array.isArray(invitingStudentid) && invitingStudentid.length &&
                        invitingStudentid.every(function (id) {
                            return typeof id === "number" && Number.isInteger(id);
                        })) {
                        checkinvitingStudentid = true;
                    }
                }
                else {
                    checkinvitingStudentid = true;
                }
                if (tutorid) {
                    if (typeof tutorid === "number" && Number.isInteger(tutorid)) {
                        checktutorid = true;
                    }
                }
                else {
                    checktutorid = true;
                }
                if (createAt) {
                    if (typeof createAt === "number" && Number.isInteger(createAt)) {
                        checkcreateAt = true;
                    }
                }
                else {
                    checkcreateAt = true;
                }
                if (isClosed) {
                    if (typeof isClosed === "boolean") {
                        checkisClosed = true;
                    }
                }
                else {
                    checkisClosed = true;
                }
                if (checkstudentids && checkinvitingStudentid && checktutorid &&
                    checkcreateAt && checkisClosed) {
                    returnObject.dataValid = true;
                }
            }
            if (!returnObject.caseidValid || !returnObject.dataValid) {
                return;
            }
            else {
                dataSyntaxValid_1 = true;
                /***********   Check data exist   ***********/
                // Find case
                casee = cases.find(function (casee) { return casee.caseid === caseid; });
                if (casee) {
                    returnObject.caseExist = true;
                }
            }
            if (!returnObject.caseExist) {
                return;
            }
            else {
                dataExist_1 = true;
                casee = {
                    caseid: caseid ? caseid : casee.caseid,
                    studentids: studentids ? studentids : casee.studentids,
                    invitingStudentid: invitingStudentid
                        ? invitingStudentid
                        : casee.invitingStudentid,
                    tutorid: tutorid ? tutorid : casee.tutorid,
                    createAt: createAt ? createAt : casee.createAt,
                    isClosed: isClosed ? isClosed : casee.isClosed
                };
                returnObject["case"] = casee;
                returnObject.success = true;
            }
        })();
        if (!haveAccessRight) {
            // returnObject = {
            //     ...returnObject,
            //     caseExist: false
            // }
            status = 403;
        }
        else if (!dataSyntaxValid_1) {
            status = 400;
        }
        else if (!dataExist_1) {
            status = 404;
        }
        else if (returnObject.success) {
            status = 200;
        }
        else {
            status = 500;
        }
        if (status !== 500) {
            returnObject.serverError = false;
        }
    }
    catch (e) {
        console.log(e);
        status = 500;
        returnObject.serverError = true;
    }
    finally {
        res.status(status).send(returnObject);
    }
});

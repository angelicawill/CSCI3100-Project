"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        studentidListValid: false,
        caseidValid: false,
        caseExist: false,
        studentExist: false,
        studentsInCaseInvitation: false,
        userRoleMatch: false,
        userInCase: false,
        "case": null,
        success: false,
        serverError: true
    };
    var status = 500;
    var _a = req.body, studentidList = _a.studentidList, caseid = _a.caseid;
    var user = req.user;
    try {
        var dataSyntaxValid_1 = false;
        var haveAccessRight_1 = false;
        var dataExist_1 = false;
        (function () {
            var casee;
            if (!user) {
                return;
            }
            else {
                /***********   Check syntax valid   ***********/
                if (Array.isArray(studentidList) && studentidList.every(function (id) { return typeof id === 'number' && Number.isInteger(id); })) {
                    returnObject.studentidListValid = true;
                }
                if (typeof caseid === 'number' && Number.isInteger(caseid)) {
                    returnObject.caseidValid = true;
                }
            }
            if (!returnObject.studentidListValid || !returnObject.caseidValid) {
                return;
            }
            else {
                dataSyntaxValid_1 = true;
                /***********   Check data exist   ***********/
                // Find case
                casee = cases.find(function (c) { return c.caseid === caseid; });
                if (casee) {
                    returnObject.caseExist = true;
                }
                // Find students
                var checkStudentsExist_1 = new Array(studentidList.length).fill(false);
                var checkStudentsInCaseInvitation_1 = new Array(studentidList.length).fill(0);
                studentidList.forEach(function (id, i) {
                    console.log(users);
                    if (users.find(function (user) { return user.userid === id && user.role === 'student'; })) {
                        checkStudentsExist_1[i] = true;
                    }
                    casee === null || casee === void 0 ? void 0 : casee.invitingStudentid.find((function (invitingStudentId) {
                        if (invitingStudentId == id) {
                            checkStudentsInCaseInvitation_1[i] = true;
                        }
                    }));
                });
                if (checkStudentsExist_1.every((function (e) { return e; }))) {
                    returnObject.studentExist = true;
                }
                if (checkStudentsInCaseInvitation_1.every((function (e) { return e; }))) {
                    returnObject.studentsInCaseInvitation = true;
                }
            }
            if (!returnObject.studentExist || !returnObject.caseExist || !returnObject.studentsInCaseInvitation) {
                return;
            }
            else {
                dataExist_1 = true;
                /***********   Check have access right   ***********/
                // check user's role is tutor
                if (user.role === "tutor") {
                    returnObject.userRoleMatch = true;
                }
                // check user is in the case
                casee = cases.find(function (c) { return c.caseid === caseid; });
                if ((casee === null || casee === void 0 ? void 0 : casee.tutorid) === user.userid) {
                    returnObject.userInCase = true;
                }
            }
            if (!returnObject.userRoleMatch || !returnObject.userInCase) {
                return;
            }
            else {
                haveAccessRight_1 = true;
                /***********   Invite student to case   ***********/
                studentidList.forEach(function (id) {
                    var index = casee.invitingStudentid.findIndex(function (invitingId) { return invitingId == id; });
                    casee.invitingStudentid.splice(index, 1);
                });
                // change in student database too
                returnObject["case"] = casee;
                returnObject.success = true;
            }
        })();
        if (!dataSyntaxValid_1) {
            status = 400;
        }
        else if (!haveAccessRight_1) {
            // returnObject = {
            //     ...returnObject,
            //     studentExist: false,
            //     caseExist: false
            // }
            status = 403;
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

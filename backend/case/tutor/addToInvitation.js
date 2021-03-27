"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        studentidListValid: false,
        caseidValid: false,
        studentExist: false,
        caseExist: false,
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
                // Find students
                var checkStudentsExist_1 = true;
                studentidList.forEach(function (id) {
                    console.log(users);
                    if (!users.find(function (user) { return user.userid === id && user.role === 'student'; })) {
                        checkStudentsExist_1 = false;
                    }
                });
                if (checkStudentsExist_1) {
                    returnObject.studentExist = true;
                }
                // Find case
                if (cases.find(function (c) { return c.caseid === caseid; })) {
                    returnObject.caseExist = true;
                }
            }
            if (!returnObject.studentExist || !returnObject.caseExist) {
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
                    casee.invitingStudentid.push(id);
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

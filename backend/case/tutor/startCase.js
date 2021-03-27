"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        userRoleMatch: false,
        "case": null,
        success: false,
        serverError: true
    };
    var status = 500;
    var user = req.user;
    try {
        var haveAccessRight_1 = false;
        (function () {
            if (!user) {
                return;
            }
            else {
                /***********   Check have access right   ***********/
                // check user's role is tutor
                if (user.role === "tutor") {
                    returnObject.userRoleMatch = true;
                }
            }
            if (!returnObject.userRoleMatch) {
                return;
            }
            else {
                haveAccessRight_1 = true;
                /***********   Start new case   ***********/
                var newCase = {
                    caseid: Date.now(),
                    studentid: [],
                    invitingStudentid: [],
                    tutorid: user.userid,
                    createAt: Date.now(),
                    isClosed: false
                };
                cases.push(newCase);
                // change in tutor database too
                returnObject["case"] = newCase;
                returnObject.success = true;
            }
        })();
        if (!haveAccessRight_1) {
            status = 403;
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

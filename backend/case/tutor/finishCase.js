"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        caseidValid: false,
        caseExist: false,
        userRoleMatch: false,
        userInCase: false,
        success: false,
        serverError: true
    };
    var status = 500;
    var caseid = req.body.caseid;
    var user = req.user;
    try {
        var dataSyntaxValid_1 = false;
        var dataExist_1 = false;
        var haveAccessRight_1 = false;
        (function () {
            var casee;
            if (!user) {
                return;
            }
            else {
                /***********   Check syntax valid   ***********/
                if (typeof caseid === "number" && Number.isInteger(caseid)) {
                    returnObject.caseidValid = true;
                }
            }
            if (!returnObject.caseidValid) {
                return;
            }
            else {
                dataSyntaxValid_1 = true;
                /***********   Check data exist   ***********/
                // Find case
                if (cases.find(function (casee) { return casee.caseid === caseid; })) {
                    returnObject.caseExist = true;
                }
            }
            if (!returnObject.caseExist) {
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
                casee = cases.find(function (casee) { return casee.caseid === caseid; });
                if (casee.tutorid === user.userid) {
                    returnObject.userInCase = true;
                }
            }
            if (!returnObject.userInCase || !returnObject.userRoleMatch) {
                return;
            }
            else {
                haveAccessRight_1 = true;
                /***********   finish case   ***********/
                casee.isClosed = true;
                // change in student and tutor database too
                returnObject.success = true;
            }
        })();
        if (!dataSyntaxValid_1) {
            status = 400;
        }
        else if (!haveAccessRight_1) {
            // returnObject = {
            //     ...returnObject,
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

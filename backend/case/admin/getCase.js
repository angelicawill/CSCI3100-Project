"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        "case": null,
        caseidValid: false,
        caseExist: false,
        userRoleMatch: false,
        success: false,
        serverError: true
    };
    var status = 500;
    var caseid = req.body.caseid;
    var user = req.user;
    try {
        var dataSyntaxValid_1 = false;
        var dataExist_1 = false;
        var haveAccessRight = false;
        (function () {
            var casee;
            /***********   Check have access right   ***********/
            // if (user.role === "admin") {
            //   returnObject.userRoleMatch = true;
            // }
            if (!returnObject.userRoleMatch) {
                return;
            }
            else {
                returnObject.userRoleMatch = true;
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

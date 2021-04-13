"use strict";
exports.__esModule = true;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
exports["default"] = (function (req, res) {
    var returnObject = {
        "case": null,
        userRoleMatch: false,
        success: false,
        serverError: true
    };
    var status = 500;
    var caseid = req.body.caseid;
    var user = req.user;
    try {
        var dataSyntaxValid = false;
        var dataExist = false;
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
                var newCase = {
                    caseid: Date.now(),
                    studentids: [1],
                    invitingStudentid: [],
                    tutorid: 2,
                    createAt: Date.now(),
                    isClosed: false
                };
                cases.push(newCase);
                returnObject["case"] = newCase;
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
        else if (!dataSyntaxValid) {
            status = 400;
        }
        else if (!dataExist) {
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

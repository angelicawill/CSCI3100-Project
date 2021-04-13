"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tutor_1 = require("../../database/tutor");
exports["default"] = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var returnObject, status, _a, studentidList, caseid, user, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                returnObject = {
                    // studentidListValid: false,
                    // caseidValid: false,
                    // studentExist: false,
                    // caseExist: false,
                    // userRoleMatch: false,
                    // userInCase: false,
                    // case: null,
                    success: false,
                    serverError: true
                };
                status = 500;
                _a = req.body, studentidList = _a.studentidList, caseid = _a.caseid;
                user = req.user;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, 4, 5]);
                // await (async () => {
                //   let casee: Types.Case;
                //   if (!user) {
                //     return;
                //   } else {
                //     /***********   Check syntax valid   ***********/
                //     if (Array.isArray(studentidList)) {
                //       let check = await Promise.all(studentidList.map((id) => {
                //         return new Promise(async (resolve, reject) => {
                //           if (typeof id == "number" && await getStudentData(id)) {
                //             resolve(true);
                //           } else {
                //             resolve(false);
                //           }
                //         });
                //       }));
                //       if (check.every(t=>t)) {
                //           returnObject.studentidListValid = true;
                //       }
                //     }
                //     if (typeof caseid === "number" && Number.isInteger(caseid)) {
                //       returnObject.caseidValid = true;
                //     }
                //   }
                //   if (!returnObject.studentidListValid || !returnObject.caseidValid) {
                //     return;
                //   } else {
                //     dataSyntaxValid = true;
                //     /***********   Check data exist   ***********/
                //     // Find students
                //     let checkStudentsExist: boolean = true;
                //     studentidList.forEach((id) => {
                //       if (
                //         !users.find((user) => user.userid === id && user.role === "student")
                //       ) {
                //         checkStudentsExist = false;
                //       }
                //     });
                //     if (checkStudentsExist) {
                //       returnObject.studentExist = true;
                //     }
                //     // Find case
                //     if (cases.find((c) => c.caseid === caseid)) {
                //       returnObject.caseExist = true;
                //     }
                //   }
                //   if (!returnObject.studentExist || !returnObject.caseExist) {
                //     return;
                //   } else {
                //     dataExist = true;
                //     /***********   Check have access right   ***********/
                //     // check user's role is tutor
                //     if (user.role === "tutor") {
                //       returnObject.userRoleMatch = true;
                //     }
                //     // check user is in the case
                //     casee = cases.find((c) => c.caseid === caseid);
                //     if (casee?.tutorid === user.userid) {
                //       returnObject.userInCase = true;
                //     }
                //   }
                //   if (!returnObject.userRoleMatch || !returnObject.userInCase) {
                //     return;
                //   } else {
                //     haveAccessRight = true;
                /***********   Invite student to case   ***********/
                _b = returnObject;
                return [4 /*yield*/, tutor_1.inviteToCase(studentidList, user.userid, caseid)];
            case 2:
                // await (async () => {
                //   let casee: Types.Case;
                //   if (!user) {
                //     return;
                //   } else {
                //     /***********   Check syntax valid   ***********/
                //     if (Array.isArray(studentidList)) {
                //       let check = await Promise.all(studentidList.map((id) => {
                //         return new Promise(async (resolve, reject) => {
                //           if (typeof id == "number" && await getStudentData(id)) {
                //             resolve(true);
                //           } else {
                //             resolve(false);
                //           }
                //         });
                //       }));
                //       if (check.every(t=>t)) {
                //           returnObject.studentidListValid = true;
                //       }
                //     }
                //     if (typeof caseid === "number" && Number.isInteger(caseid)) {
                //       returnObject.caseidValid = true;
                //     }
                //   }
                //   if (!returnObject.studentidListValid || !returnObject.caseidValid) {
                //     return;
                //   } else {
                //     dataSyntaxValid = true;
                //     /***********   Check data exist   ***********/
                //     // Find students
                //     let checkStudentsExist: boolean = true;
                //     studentidList.forEach((id) => {
                //       if (
                //         !users.find((user) => user.userid === id && user.role === "student")
                //       ) {
                //         checkStudentsExist = false;
                //       }
                //     });
                //     if (checkStudentsExist) {
                //       returnObject.studentExist = true;
                //     }
                //     // Find case
                //     if (cases.find((c) => c.caseid === caseid)) {
                //       returnObject.caseExist = true;
                //     }
                //   }
                //   if (!returnObject.studentExist || !returnObject.caseExist) {
                //     return;
                //   } else {
                //     dataExist = true;
                //     /***********   Check have access right   ***********/
                //     // check user's role is tutor
                //     if (user.role === "tutor") {
                //       returnObject.userRoleMatch = true;
                //     }
                //     // check user is in the case
                //     casee = cases.find((c) => c.caseid === caseid);
                //     if (casee?.tutorid === user.userid) {
                //       returnObject.userInCase = true;
                //     }
                //   }
                //   if (!returnObject.userRoleMatch || !returnObject.userInCase) {
                //     return;
                //   } else {
                //     haveAccessRight = true;
                /***********   Invite student to case   ***********/
                _b.success = _c.sent();
                //   }
                // })();
                // if (!dataSyntaxValid) {
                //   status = 400;
                // } else if (!haveAccessRight) {
                //   status = 403;
                // } else if (!dataExist) {
                //   status = 404;
                // } else
                if (returnObject.success) {
                    status = 200;
                }
                returnObject.serverError = false;
                return [3 /*break*/, 5];
            case 3:
                e_1 = _c.sent();
                console.log(e_1);
                status = 500;
                returnObject.serverError = true;
                return [3 /*break*/, 5];
            case 4:
                res.status(status).send(returnObject);
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });

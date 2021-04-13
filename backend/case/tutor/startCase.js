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
var startCase = require("../../database/tutor").startCase;
var tutor_1 = require("../../database/tutor");
exports["default"] = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var returnObject, status, user, haveAccessRight_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                returnObject = {
                    userRoleMatch: false,
                    cases: null,
                    success: false,
                    serverError: true
                };
                status = 500;
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                haveAccessRight_1 = false;
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var tutor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!user) {
                                        return [2 /*return*/];
                                    }
                                    else {
                                        /***********   Check have access right   ***********/
                                        // check user's role is tutor
                                        if (user.role === "tutor") {
                                            returnObject.userRoleMatch = true;
                                        }
                                    }
                                    if (!!returnObject.userRoleMatch) return [3 /*break*/, 1];
                                    return [2 /*return*/];
                                case 1:
                                    haveAccessRight_1 = true;
                                    /***********   Start new case   ***********/
                                    return [4 /*yield*/, startCase(user.userid)
                                        // change in tutor database too
                                    ];
                                case 2:
                                    /***********   Start new case   ***********/
                                    _a.sent();
                                    return [4 /*yield*/, tutor_1.getTutorData(user.userid)];
                                case 3:
                                    tutor = _a.sent();
                                    returnObject.cases = tutor.cases;
                                    returnObject.success = true;
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 2:
                _a.sent();
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
                return [3 /*break*/, 5];
            case 3:
                e_1 = _a.sent();
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

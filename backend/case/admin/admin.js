"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
router.post('/getcase', require('./getCase')["default"]);
router.post('/createcase', require('./createCase')["default"]);
router.post('/deletecase', require('./deleteCase')["default"]);
router.post('/updatecase', require('./updateCase')["default"]);
exports["default"] = router;

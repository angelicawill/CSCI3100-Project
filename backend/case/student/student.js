"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
router.post('/acceptcase', require('./acceptCase')["default"]);
router.post('/getoutfromcase', require('./getOutFromCase')["default"]);
router.post('/getoutfrominvitation', require('./getOutFromInvitation')["default"]);
router.post('/getcase', require('./getCase')["default"]);
exports["default"] = router;

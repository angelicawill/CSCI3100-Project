"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
router.post('/startcase', require('./startCase')["default"]);
router.put('/invitetocase', require('./inviteToCase')["default"]);
router.put('/finishcase', require('./finishCase')["default"]);
// router.post('/removefrominvitation', require('./removeFromInvitation').default)
// router.post('/removefromcase', require('./removeFromCase').default)
// router.post('/getcase', require('./getCase').default)
exports["default"] = router;

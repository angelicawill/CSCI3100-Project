import express from 'express';
const router = express.Router();

router.post('/acceptcase', require('./acceptCase').default)
router.post('/getoutfromcase', require('./getOutFromCase').default)
router.post('/getoutfrominvitation', require('./getOutFromInvitation').default)
router.post('/getcase', require('./getCase').default)



export default router
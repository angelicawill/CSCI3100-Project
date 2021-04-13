import express from 'express';
const router = express.Router();

router.post('/startcase', require('./startCase').default)
router.put('/invitetocase', require('./inviteToCase').default)
router.put('/finishcase', require('./finishCase').default)
// router.post('/removefrominvitation', require('./removeFromInvitation').default)
// router.post('/removefromcase', require('./removeFromCase').default)
// router.post('/getcase', require('./getCase').default)


export default router
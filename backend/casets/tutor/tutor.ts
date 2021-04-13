import express from 'express';
const router = express.Router();

router.post('/startcase', require('./startCase').default)
router.post('/addtoinvitation', require('./addToInvitation').default)
// router.post('/finishcase', require('./finishCase').default)
// router.post('/removefrominvitation', require('./removeFromInvitation').default)
// router.post('/removefromcase', require('./removeFromCase').default)
// router.post('/getcase', require('./getCase').default)


export default router
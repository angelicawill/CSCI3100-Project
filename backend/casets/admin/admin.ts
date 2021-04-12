import express from 'express';
const router = express.Router();

router.post('/getcase', require('./getCase').default)
router.post('/createcase', require('./createCase').default)
router.post('/deletecase', require('./deleteCase').default)
router.post('/updatecase', require('./updateCase').default)





export default router
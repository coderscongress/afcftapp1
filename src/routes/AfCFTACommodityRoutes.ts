import { Router } from 'express';
import { getCommodities, convertUnits } from '../controllers/AfCFTACommodityController';

const router = Router();

router.get('/', getCommodities);
router.get('/convert', convertUnits); // e.g. ?from=tons&to=kg&value=2

export default router;
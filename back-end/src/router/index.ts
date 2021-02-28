import { Router } from 'express';
import controller from '../controller';
const router = Router();

router.use('/api/v1/',controller)

export default router;
import siginin from '../controller/user/siginin';
import { Router } from 'express';
const router: Router = Router();

/*
 * user/
 */

router.post('/signin', siginin.post);

export default router;

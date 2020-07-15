import siginin from '../controller/user/siginin';
import { Router } from 'express';
import signout from '../controller/user/signout';
import signup from '../controller/user/signup';
const router: Router = Router();

/*
 * user/
 */

router.post('/signin', siginin.post);
router.get('/signout', signout.get);
router.post('/signup', signup.post);

export default router;

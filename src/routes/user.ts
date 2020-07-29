import siginin from '../controller/user/siginin';
import { Router } from 'express';
import signout from '../controller/user/signout';
import signup from '../controller/user/signup';
import userInfo from '../controller/user/userInfo';
const router: Router = Router();

/*
 * user/
 */

router.post('/signin', siginin.post);
router.get('/signout', signout.get);
router.get('/userinfo', userInfo.get);
router.post('/signup', signup.post);

export default router;

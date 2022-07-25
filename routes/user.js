import express from 'express';
import {
    getLoginPage,
    getRegisterPage,
    handleRegistration,
    getHome,
    handleLogin,
} from '../controllers/user.js';
import {
    validateUserSignUp,
    UserValidation,
    validateUserlogin,
} from '../middleware/userValidation.js';
import { isAuth } from '../middleware/isAUth.js';

const router = express.Router();

router.get('/', getHome);

router.get('/login', getLoginPage);
router.post('/login', validateUserlogin, UserValidation, handleLogin);

router.get('/register', getRegisterPage);
router.post(
    '/register',
    validateUserSignUp,
    UserValidation,
    handleRegistration
); //middleware functions when the client triggers the post route

//  router.post('/logout', logout );
export default router;

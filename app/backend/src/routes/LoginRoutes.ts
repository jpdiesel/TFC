import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import logInVerification from '../middlewares/LoginMidd';

const router = Router();

const loginController = new LoginController();

router.post('/', logInVerification, loginController.logIn);
router.get('/validate', loginController.validateToken);

export default router;

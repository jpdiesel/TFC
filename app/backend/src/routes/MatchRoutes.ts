import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.allMatches);

export default router;

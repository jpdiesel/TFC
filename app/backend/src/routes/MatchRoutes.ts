import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import { equalTeamsValidation, teamExistence } from '../middlewares/MatchMidd';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.allMatches);
router.post('/', teamExistence, equalTeamsValidation, matchController.saveMatch);
router.patch('/:id/finish', matchController.saveFinishedMatch);
router.patch('/:id', matchController.updateMatch);

export default router;

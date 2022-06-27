import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.allTeams);
router.get('/:id', teamController.oneTeam);

export default router;

import { Request, Response } from 'express';
import Match from '../database/models/match';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private match = new MatchService()) {}

  public allMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const matches = await this.match.getMatchesByQuery(inProgress === 'true');
        return res.status(200).json(matches);
      }
      const matches = await this.match.getAllTeams();
      return res.status(200).json(matches);
    } catch (e) {
      console.log(e);
    }
  };

  public saveMatch = async (req: Request, res: Response) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const save = await this.match
        .saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
      return res.status(201).json(save);
    } catch (e) {
      console.log(e);
    }
  };

  public saveFinishedMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const verifyMatchExistence = await Match.findByPk(id);
      if (!verifyMatchExistence) return res.status(401).json({ message: 'Match not found' });
      await this.match.saveFinishedMatch(parseInt(id, 16));
      return res.status(200).json({ message: 'Finished' });
    } catch (e) {
      console.log(e);
    }
  };

  public updateMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      if (homeTeamGoals !== undefined) {
        await this.match.updateScore(homeTeamGoals, awayTeamGoals, parseInt(id, 16));
        return res.status(200).json({ message: 'Score updated' });
      }
      await this.match.endMatch(parseInt(id, 16));
      return res.status(200).json({ message: 'Match ended succesfully' });
    } catch (e) {
      console.log(e);
    }
  };
}

export default MatchController;

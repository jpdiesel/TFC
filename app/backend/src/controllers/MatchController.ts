import { Request, Response } from 'express';
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
}

export default MatchController;

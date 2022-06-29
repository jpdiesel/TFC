import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboard = new LeaderboardService()) {}

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    try {
      const board = await this.leaderboard.homeLeaderboard();
      res.status(200).json(board);
    } catch (e) {
      console.log(e);
    }
  };

  public getAwayLeaderboard = async (_req: Request, res: Response) => {
    try {
      const board = await this.leaderboard.awayLeaderboard();
      res.status(200).json(board);
    } catch (e) {
      console.log(e);
    }
  };

  public getFullLeaderboard = async (_req: Request, res: Response) => {
    try {
      const board = await this.leaderboard.fullLeaderboard();
      res.status(200).json(board);
    } catch (e) {
      console.log(e);
    }
  };
}

export default LeaderboardController;
